import psycopg2

conn = psycopg2.connect(
    "postgresql://neondb_owner:***@ep-fragrant-sky-atsp2665-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require"
)
cur = conn.cursor()

# Get all tables
cur.execute("""
    SELECT table_name, table_type 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
""")
tables = cur.fetchall()
print("=== TABLES ===")
for t in tables:
    print(f"  {t[0]} ({t[1]})")

# For each table, get columns
for t in tables:
    name = t[0]
    cur.execute("""
        SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = %s
        ORDER BY ordinal_position
    """, (name,))
    cols = cur.fetchall()
    print(f"\n--- {name} ---")
    for c in cols:
        extra = f"  default={c[4]}" if c[4] else ""
        nullable = "NULL" if c[3] == "YES" else "NOT NULL"
        print(f"  {c[0]} ({c[1]}{c[2] and f'({c[2]})' or ''}) {nullable}{extra}")

    # Get constraints (PKs, FKs, unique)
    cur.execute("""
        SELECT con.conname, con.contype,
               pg_get_constraintdef(con.oid)
        FROM pg_catalog.pg_constraint con
        INNER JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid
        INNER JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
        WHERE nsp.nspname = 'public' AND rel.relname = %s
    """, (name,))
    constraints = cur.fetchall()
    for con in constraints:
        print(f"  [{con[1]}] {con[0]}: {con[2]}")

cur.close()
conn.close()
