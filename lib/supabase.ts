import adminsData from "@/data/admins.json";
import type { Actualite } from "@/lib/types";

type QueryResult<T> = Promise<{ data: T[] | null }>;

class QueryBuilder<T> {
  private rows: T[];

  constructor(rows: T[]) {
    this.rows = rows;
  }

  // API compatible (minimal) avec l'usage du projet
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select(_columns: string): this {
    return this;
  }

  order(field: string, opts?: { ascending?: boolean }): this {
    const ascending = opts?.ascending ?? true;
    this.rows = [...this.rows].sort((a: any, b: any) => {
      const av = a?.[field];
      const bv = b?.[field];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return ascending ? -1 : 1;
      if (av > bv) return ascending ? 1 : -1;
      return 0;
    });
    return this;
  }

  limit(n: number): QueryResult<T> {
    return Promise.resolve({ data: this.rows.slice(0, n) });
  }
}

export const supabase = {
  from(table: string) {
    if (table === "actualites") {
      const actus = (((adminsData as any).actualites || []) as Actualite[]).map((a) => ({
        ...a,
        created_at: (a as any).created_at ?? (a as any).datePublication ?? new Date().toISOString(),
      }));
      return new QueryBuilder<Actualite>(actus);
    }
    return new QueryBuilder<any>([]);
  },
};

// L'app s'attend à une image en base64, mais un chemin public fonctionne aussi dans un <img src="...">
export const LOGO_B64 = "/images/logo-eces.jpeg";

