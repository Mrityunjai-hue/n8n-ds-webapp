import { ColumnDef, TableSchema } from '../types';
import { TABLE_ARCHETYPES, TableArchetype, DOMAIN_CATEGORIES } from './schemaKnowledgeBase';

export interface DomainClassificationResult {
  matchedArchetype?: TableArchetype;
  domainName: string;
  domainCategory: string;
  confidence: number;
  reason: string;
  suggestedTableName: string;
}

export interface SyntheticDataset {
  tableName: string;
  domain: string;
  columns: ColumnDef[];
  rows: Record<string, any>[];
  createTableSql: string;
  insertSql: string;
  fullSql: string;
}

// ── Realistic Data Dictionaries ──────────────────────────────────────
const FIRST_NAMES = [
  'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Ava', 'Elijah', 'Charlotte',
  'William', 'Sophia', 'James', 'Amelia', 'Benjamin', 'Isabella', 'Lucas', 'Mia',
  'Henry', 'Evelyn', 'Alexander', 'Harper', 'Sebastian', 'Camila', 'Mateo', 'Aria',
  'Arjun', 'Priya', 'Elena', 'Daisuke', 'Kenji', 'Fatima', 'Tariq', 'Chloe',
  'Antoine', 'Sven', 'Ingrid', 'Luka', 'Zoe', 'Chen', 'Mei', 'Yuki'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Patel', 'Chen',
  'Nakamura', 'Dubois', 'Mueller', 'Novak', 'Kim', 'Tanaka', 'Rossi', 'Silva'
];

const DOMAINS = ['gmail.com', 'outlook.com', 'acme-corp.com', 'vertex-ai.io', 'hyperion.org', 'cloudscale.net'];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'USA': ['San Francisco', 'New York', 'Seattle', 'Austin', 'Chicago', 'Boston', 'Los Angeles'],
  'UK': ['London', 'Manchester', 'Edinburgh', 'Bristol', 'Cambridge'],
  'Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
  'Singapore': ['Singapore'],
  'India': ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad'],
  'France': ['Paris', 'Lyon', 'Marseille'],
  'Switzerland': ['Zurich', 'Geneva', 'Basel'],
};

const COUNTRIES = Object.keys(CITIES_BY_COUNTRY);

const PRODUCT_ADJECTIVES = ['Ultra', 'Pro', 'Smart', 'Eco', 'Quantum', 'Cloud', 'Ergonomic', 'NextGen', 'Pulse', 'Hyper'];
const PRODUCT_NOUNS = ['Monitor', 'Keyboard', 'Sensor', 'Headset', 'Router', 'Drone', 'Hub', 'Camera', 'Speaker', 'Watch', 'Desk'];
const PRODUCT_CATEGORIES = ['Electronics', 'Office Supplies', 'Audio & Video', 'Smart Home', 'Wearables', 'Accessories'];

const STATUS_POOLS: Record<string, string[]> = {
  order: ['pending', 'processing', 'completed', 'shipped', 'cancelled', 'refunded'],
  payment: ['authorized', 'settled', 'declined', 'disputed', 'refunded'],
  ticket: ['open', 'in_progress', 'escalated', 'resolved', 'closed'],
  subscription: ['active', 'trialing', 'past_due', 'canceled', 'paused'],
  lead: ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'],
  generic: ['active', 'pending', 'inactive', 'archived'],
};

// ── 1. Domain & Table Classifier ─────────────────────────────────────
export function classifyTableDomain(inputName: string): DomainClassificationResult {
  const normalized = inputName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const tokens = normalized.split('_').filter(Boolean);

  let bestMatch: TableArchetype | undefined;
  let maxScore = 0;

  for (const arch of TABLE_ARCHETYPES) {
    let score = 0;

    // Direct regex match
    if (arch.pattern.test(normalized)) {
      score += 10;
    }

    // Exact table name match
    if (arch.tableName === normalized) {
      score += 15;
    }

    // Token keyword overlap
    for (const token of tokens) {
      if (arch.keywords.includes(token)) {
        score += 4;
      }
      if (arch.tableName.includes(token)) {
        score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = arch;
    }
  }

  if (bestMatch && maxScore >= 4) {
    const confidence = Math.min(0.99, Math.max(0.70, maxScore / 20));
    return {
      matchedArchetype: bestMatch,
      domainName: bestMatch.domain,
      domainCategory: bestMatch.domainCategory,
      confidence,
      reason: `Matched pattern and keywords for "${bestMatch.tableName}" in ${bestMatch.domain}.`,
      suggestedTableName: normalized || bestMatch.tableName,
    };
  }

  // Fallback heuristic classification
  return {
    domainName: 'General Enterprise Entity',
    domainCategory: 'saas',
    confidence: 0.65,
    reason: `Inferred custom relational entity "${normalized}" with standard auto-increment primary key and audit timestamps.`,
    suggestedTableName: normalized || 'custom_entity',
  };
}

// ── 2. Semantic Column Type Inferer ──────────────────────────────────
export function inferColumnTypeAndConstraints(
  colName: string,
  tableName: string = ''
): {
  type: ColumnDef['type'];
  nullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  references?: { table: string; column: string };
  description: string;
} {
  const name = colName.trim().toLowerCase();

  // Primary Keys
  if (name === 'id' || name === `${tableName}_id` || name === 'pk_id') {
    return {
      type: 'INTEGER',
      nullable: false,
      isPrimaryKey: true,
      isForeignKey: false,
      description: `Primary key identifier for ${tableName || 'record'}`,
    };
  }

  // UUIDs / Hashes / Codes
  if (/^(uuid|guid|api_key|hash|token|secret_key|sku|tracking_number|barcode)/i.test(name)) {
    return {
      type: 'TEXT',
      nullable: false,
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'Unique string code or token hash',
    };
  }

  // Foreign Keys (e.g., customer_id, order_id, user_id, tenant_id)
  if (name.endsWith('_id') || name.endsWith('_fk')) {
    const targetTable = name.replace(/_id$|_fk$/, '') + 's';
    return {
      type: 'INTEGER',
      nullable: false,
      isPrimaryKey: false,
      isForeignKey: true,
      references: { table: targetTable, column: name },
      description: `Foreign key reference to ${targetTable}.${name}`,
    };
  }

  // Boolean Flags (is_*, has_*, can_*, opt_in, enabled)
  if (/^(is_|has_|can_|should_|opt_|enabled|active|flag_|is_deleted)/i.test(name)) {
    return {
      type: 'BOOLEAN',
      nullable: false,
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'Boolean flag constraint (1 for true, 0 for false)',
    };
  }

  // Financial / Currency / Money Amounts
  if (
    /(price|amount|cost|salary|revenue|total|balance|fee|tax|discount|charge|subtotal|budget|mrr|arr|rate_amount)/i.test(
      name
    )
  ) {
    return {
      type: 'REAL',
      nullable: false,
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'Monetary decimal value (USD/Standard)',
    };
  }

  // Percentage / Ratios / Scores / Probabilities
  if (/(rate|ratio|pct|percentage|score|probability|rating|p_value|confidence|z_score|mmr)/i.test(name)) {
    return {
      type: 'REAL',
      nullable: true,
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'Continuous numerical metric or score',
    };
  }

  // Integer Quantities / Counts / Years / Ages
  if (/(quantity|count|units|stock|age|duration|views|likes|shares|clicks|retries|attempts|year)/i.test(name)) {
    return {
      type: 'INTEGER',
      nullable: false,
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'Discrete integer metric or counter',
    };
  }

  // Dates & Timestamps
  if (/(created_at|updated_at|deleted_at|timestamp|order_date|signup_date|birth_date|started_at|ended_at|shipped_at|delivered_at|_date|_time)$/i.test(name)) {
    return {
      type: 'DATETIME',
      nullable: name.includes('deleted') || name.includes('end') || name.includes('deliver'),
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'ISO-8601 temporal timestamp',
    };
  }

  // JSON / Metadata payloads
  if (/(metadata|payload|settings|config|attributes|json_data|details)/i.test(name)) {
    return {
      type: 'TEXT',
      nullable: true,
      isPrimaryKey: false,
      isForeignKey: false,
      description: 'Structured JSON object string',
    };
  }

  // Default Text (names, descriptions, status, email, phone, country)
  return {
    type: 'TEXT',
    nullable: true,
    isPrimaryKey: false,
    isForeignKey: false,
    description: 'Text string column',
  };
}

// ── 3. Realistic Value Generator for Single Cell ─────────────────────
function generateCellValue(
  col: ColumnDef,
  rowIndex: number,
  rowContext: Record<string, any>
): any {
  const name = col.name.toLowerCase();

  // Primary Key auto-increment
  if (col.isPrimaryKey) {
    return rowIndex + 1;
  }

  // Foreign Key references
  if (col.isForeignKey) {
    // Generate coherent FKs in range 1..25
    return ((rowIndex * 3 + 7) % 25) + 1;
  }

  // Null probability for nullable non-critical columns
  if (col.nullable && Math.random() < 0.08 && !name.includes('country') && !name.includes('email')) {
    return null;
  }

  // First & Last Names
  if (name === 'first_name') {
    return FIRST_NAMES[rowIndex % FIRST_NAMES.length];
  }
  if (name === 'last_name') {
    return LAST_NAMES[(rowIndex + 3) % LAST_NAMES.length];
  }
  if (name === 'full_name' || name === 'name' || name === 'customer_name' || name === 'author') {
    const f = FIRST_NAMES[rowIndex % FIRST_NAMES.length];
    const l = LAST_NAMES[(rowIndex + 3) % LAST_NAMES.length];
    return `${f} ${l}`;
  }

  // Email (derived coherently from name if present)
  if (name.includes('email')) {
    const f = (rowContext.first_name || FIRST_NAMES[rowIndex % FIRST_NAMES.length]).toLowerCase();
    const l = (rowContext.last_name || LAST_NAMES[(rowIndex + 3) % LAST_NAMES.length]).toLowerCase();
    const d = DOMAINS[rowIndex % DOMAINS.length];
    return `${f}.${l}${rowIndex + 1}@${d}`;
  }

  // Phone Number
  if (name.includes('phone') || name.includes('mobile')) {
    const area = 200 + (rowIndex * 17) % 700;
    const mid = 100 + (rowIndex * 31) % 899;
    const last = 1000 + (rowIndex * 43) % 8999;
    return `+1-${area}-${mid}-${last}`;
  }

  // Country & City
  if (name === 'country' || name === 'shipping_country' || name === 'origin_country') {
    return COUNTRIES[rowIndex % COUNTRIES.length];
  }
  if (name === 'city' || name === 'shipping_city') {
    const country = rowContext.country || rowContext.shipping_country || COUNTRIES[rowIndex % COUNTRIES.length];
    const cityList = CITIES_BY_COUNTRY[country] || CITIES_BY_COUNTRY['USA'];
    return cityList[rowIndex % cityList.length];
  }

  // Status Enums
  if (name === 'status' || name === 'order_status') {
    const pool = STATUS_POOLS.order;
    return pool[rowIndex % pool.length];
  }
  if (name === 'transaction_type' || name === 'payment_type') {
    const pool = ['debit', 'credit', 'wire', 'card_charge', 'refund'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'plan_tier') {
    const pool = ['Starter', 'Professional', 'Enterprise', 'Scale'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'customer_tier') {
    const pool = ['Standard', 'Silver', 'Gold', 'Platinum', 'VIP'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'department') {
    const pool = ['Engineering', 'Product', 'Sales', 'Marketing', 'Finance', 'Legal', 'Operations'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'currency') {
    const pool = ['USD', 'EUR', 'GBP', 'CAD', 'JPY'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'gender') {
    const pool = ['Female', 'Male', 'Non-binary'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'blood_type') {
    const pool = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'carrier') {
    const pool = ['FedEx', 'DHL Express', 'UPS Ground', 'USPS Priority', 'Amazon Logistics'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'character_class') {
    const pool = ['Warrior', 'Mage', 'Rogue', 'Paladin', 'Archer'];
    return pool[rowIndex % pool.length];
  }
  if (name === 'match_result') {
    return rowIndex % 2 === 0 ? 'victory' : 'defeat';
  }

  // Monetary Amounts (Log-normal Benford distribution)
  if (col.type === 'REAL' && /(price|amount|cost|salary|revenue|total|balance|fee|tax|discount|charge|subtotal|mrr)/i.test(name)) {
    if (name.includes('salary')) {
      const base = 75000 + (rowIndex * 6421) % 115000;
      return Math.round(base);
    }
    if (name.includes('discount')) {
      return Math.round(((rowIndex * 3.7) % 25) * 100) / 100;
    }
    if (name.includes('tax')) {
      return Math.round(((rowIndex * 4.2) % 18) * 100) / 100;
    }
    const val = 12.5 + ((rowIndex * 29.83) % 450);
    return Math.round(val * 100) / 100;
  }

  // Continuous Scores / Ratings / Probabilities
  if (col.type === 'REAL') {
    if (name.includes('rating') || name.includes('review_score')) {
      return Math.round((3.2 + ((rowIndex * 0.47) % 1.8)) * 10) / 10;
    }
    if (name.includes('fraud_score') || name.includes('risk') || name.includes('probability') || name.includes('p_value')) {
      return Math.round(((rowIndex * 0.093) % 0.99) * 100) / 100;
    }
    return Math.round(((rowIndex * 7.19) % 100) * 100) / 100;
  }

  // Boolean Flags
  if (col.type === 'BOOLEAN') {
    // 75% true for active/verified flags
    return rowIndex % 4 !== 0 ? 1 : 0;
  }

  // Integer Quantities / Counts / Years
  if (col.type === 'INTEGER') {
    if (name.includes('year')) return 2020 + (rowIndex % 6);
    if (name.includes('age')) return 21 + ((rowIndex * 7) % 55);
    if (name.includes('stock') || name.includes('inventory')) return 10 + (rowIndex * 13) % 350;
    if (name.includes('seat')) return 5 + (rowIndex * 5) % 100;
    if (name.includes('kills')) return (rowIndex * 4) % 18;
    if (name.includes('deaths')) return (rowIndex * 3) % 12;
    if (name.includes('assists')) return (rowIndex * 5) % 15;
    if (name.includes('mmr')) return 1200 + (rowIndex * 85) % 1600;
    if (name.includes('view') || name.includes('like')) return 120 + (rowIndex * 89) % 4500;
    return 1 + (rowIndex * 3) % 50;
  }

  // Dates & Timestamps
  if (col.type === 'DATETIME' || col.type === 'DATE') {
    const baseDate = new Date('2024-01-15T09:00:00Z');
    const offsetDays = (rowIndex * 3) % 90;
    const offsetHours = (rowIndex * 7) % 24;
    const offsetMinutes = (rowIndex * 13) % 60;
    const date = new Date(baseDate.getTime() + (offsetDays * 86400 + offsetHours * 3600 + offsetMinutes * 60) * 1000);

    if (name.includes('birth')) {
      const birthYear = 1970 + ((rowIndex * 3) % 35);
      return `${birthYear}-0${(rowIndex % 9) + 1}-15`;
    }

    if (col.type === 'DATE') {
      return date.toISOString().split('T')[0];
    }
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }

  // Product Names
  if (name.includes('product_name') || name.includes('item_name')) {
    const adj = PRODUCT_ADJECTIVES[rowIndex % PRODUCT_ADJECTIVES.length];
    const noun = PRODUCT_NOUNS[(rowIndex * 2) % PRODUCT_NOUNS.length];
    return `${adj} ${noun} ${100 + (rowIndex % 900)}`;
  }

  // Categories
  if (name === 'category' || name === 'product_category') {
    return PRODUCT_CATEGORIES[rowIndex % PRODUCT_CATEGORIES.length];
  }

  // JSON payloads
  if (name.includes('metadata') || name.includes('payload') || name.includes('config')) {
    return JSON.stringify({
      version: '1.2.0',
      source: 'web_client',
      tags: ['production', 'verified'],
      tracking_id: `trk_${1000 + rowIndex}`,
    });
  }

  // Generic text fallback
  return `Record Value #${rowIndex + 1}`;
}

// ── 4. Main Synthesizer: Generate Realistic Multi-Row Dataset ────────
export function synthesizeTableData(
  tableName: string,
  columns: ColumnDef[],
  rowCount: number = 25
): SyntheticDataset {
  const cleanName = tableName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'custom_table';
  const classification = classifyTableDomain(cleanName);

  const rows: Record<string, any>[] = [];

  for (let i = 0; i < rowCount; i++) {
    const row: Record<string, any> = {};

    // 1st pass: non-dependent columns
    for (const col of columns) {
      row[col.name] = generateCellValue(col, i, row);
    }

    // 2nd pass: enforce semantic arithmetic coherence
    if (row.subtotal_amount !== undefined && row.tax_amount !== undefined && row.discount_amount !== undefined && row.total_amount !== undefined) {
      row.total_amount = Math.round((row.subtotal_amount + row.tax_amount - row.discount_amount) * 100) / 100;
    }

    rows.push(row);
  }

  // Generate SQL statements
  const createTableSql = generateCreateTableSql(cleanName, columns);
  const insertSql = generateInsertSql(cleanName, columns, rows);
  const fullSql = `${createTableSql}\n\n${insertSql}`;

  return {
    tableName: cleanName,
    domain: classification.domainName,
    columns,
    rows,
    createTableSql,
    insertSql,
    fullSql,
  };
}

// ── 5. Generate CREATE TABLE DDL ─────────────────────────────────────
export function generateCreateTableSql(tableName: string, columns: ColumnDef[]): string {
  const colDefs = columns.map((col) => {
    let def = `  ${col.name} ${col.type}`;
    if (col.isPrimaryKey) {
      def += ' PRIMARY KEY AUTOINCREMENT';
    } else if (!col.nullable) {
      def += ' NOT NULL';
    }
    if (col.isForeignKey && col.references) {
      def += ` REFERENCES ${col.references.table}(${col.references.column})`;
    }
    return def;
  });

  return `CREATE TABLE IF NOT EXISTS ${tableName} (\n${colDefs.join(',\n')}\n);`;
}

// ── 6. Generate Batch INSERT INTO DML ────────────────────────────────
export function generateInsertSql(
  tableName: string,
  columns: ColumnDef[],
  rows: Record<string, any>[]
): string {
  if (!rows || rows.length === 0) return '';

  const colNames = columns.map((c) => c.name).join(', ');

  const valueTuples = rows.map((row) => {
    const tupleValues = columns.map((col) => {
      const val = row[col.name];
      if (val === null || val === undefined) {
        return 'NULL';
      }
      if (typeof val === 'number') {
        return String(val);
      }
      if (typeof val === 'boolean') {
        return val ? '1' : '0';
      }
      // Escape single quotes for SQL safety
      const escaped = String(val).replace(/'/g, "''");
      return `'${escaped}'`;
    });
    return `  (${tupleValues.join(', ')})`;
  });

  return `INSERT INTO ${tableName} (${colNames})\nVALUES\n${valueTuples.join(',\n')};`;
}

// ── 7. Automatic Missing Column Recommendations ──────────────────────
export function suggestMissingColumns(
  tableName: string,
  existingColumns: ColumnDef[]
): ColumnDef[] {
  const existingNames = new Set(existingColumns.map((c) => c.name.toLowerCase()));
  const classification = classifyTableDomain(tableName);
  const suggestions: ColumnDef[] = [];

  // Check if primary key exists
  const hasPk = existingColumns.some((c) => c.isPrimaryKey);
  if (!hasPk && !existingNames.has('id') && !existingNames.has(`${tableName}_id`)) {
    suggestions.push({
      name: `${tableName}_id`,
      type: 'INTEGER',
      nullable: false,
      isPrimaryKey: true,
      description: 'Standard surrogate primary key',
    });
  }

  // Canonical archetype column suggestions
  if (classification.matchedArchetype) {
    for (const canonCol of classification.matchedArchetype.canonicalColumns) {
      if (!existingNames.has(canonCol.name.toLowerCase())) {
        suggestions.push(canonCol);
      }
    }
  }

  // Standard enterprise audit columns
  const standardAuditCols: ColumnDef[] = [
    { name: 'status', type: 'TEXT', nullable: false, description: 'Lifecycle state enum' },
    { name: 'created_at', type: 'DATETIME', nullable: false, description: 'Row insertion audit timestamp' },
    { name: 'updated_at', type: 'DATETIME', nullable: true, description: 'Last modification audit timestamp' },
    { name: 'is_active', type: 'BOOLEAN', nullable: false, description: 'Soft active flag' },
  ];

  for (const auditCol of standardAuditCols) {
    if (!existingNames.has(auditCol.name) && !suggestions.some((s) => s.name === auditCol.name)) {
      suggestions.push(auditCol);
    }
  }

  return suggestions.slice(0, 6);
}
