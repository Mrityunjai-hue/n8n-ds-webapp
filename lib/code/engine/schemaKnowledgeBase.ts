import { ColumnDef } from '../types';

export interface TableArchetype {
  id: string;
  tableName: string;
  domain: string;
  domainCategory: 'ecommerce' | 'fintech' | 'saas' | 'healthcare' | 'social' | 'logistics' | 'analytics' | 'hr' | 'security' | 'hospitality' | 'gaming' | 'education' | 'media' | 'iot' | 'manufacturing' | 'legal';
  description: string;
  keywords: string[];
  pattern: RegExp;
  canonicalColumns: ColumnDef[];
  recommendedQueries: {
    title: string;
    description: string;
    sql: string;
  }[];
}

export const DOMAIN_CATEGORIES = [
  { id: 'ecommerce', label: 'E-Commerce & Retail', icon: '🛍️', color: 'blue' },
  { id: 'fintech', label: 'Fintech & Banking', icon: '💳', color: 'green' },
  { id: 'saas', label: 'SaaS & Subscriptions', icon: '☁️', color: 'purple' },
  { id: 'healthcare', label: 'Healthcare & Biotech', icon: '🏥', color: 'red' },
  { id: 'social', label: 'Social & Media', icon: '📱', color: 'pink' },
  { id: 'logistics', label: 'Logistics & Supply Chain', icon: '🚚', color: 'amber' },
  { id: 'analytics', label: 'Product & Telemetry', icon: '📊', color: 'cyan' },
  { id: 'hr', label: 'Human Resources & Org', icon: '👥', color: 'indigo' },
  { id: 'security', label: 'Cybersecurity & SecOps', icon: '🛡️', color: 'teal' },
  { id: 'hospitality', label: 'Real Estate & Hospitality', icon: '🏨', color: 'orange' },
  { id: 'gaming', label: 'Gaming & Esports', icon: '🎮', color: 'emerald' },
  { id: 'education', label: 'Education & LMS', icon: '🎓', color: 'yellow' },
] as const;

export const TABLE_ARCHETYPES: TableArchetype[] = [
  // ── 1. E-Commerce & Retail ──────────────────────────────────────────
  {
    id: 'orders',
    tableName: 'orders',
    domain: 'E-Commerce & Retail',
    domainCategory: 'ecommerce',
    description: 'Customer purchase orders with payment and fulfillment tracking.',
    keywords: ['order', 'purchase', 'sale', 'checkout', 'basket', 'invoice', 'shop', 'ecommerce'],
    pattern: /^(orders?|purchases?|sales?|checkouts?)/i,
    canonicalColumns: [
      { name: 'order_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique order identifier' },
      { name: 'customer_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: { table: 'customers', column: 'customer_id' }, description: 'Purchaser account reference' },
      { name: 'order_date', type: 'DATETIME', nullable: false, description: 'Timestamp when order was placed' },
      { name: 'status', type: 'TEXT', nullable: false, description: 'Status (pending, completed, shipped, cancelled, refunded)' },
      { name: 'subtotal_amount', type: 'REAL', nullable: false, description: 'Gross order sum before discount' },
      { name: 'discount_amount', type: 'REAL', nullable: false, description: 'Promotional discount applied' },
      { name: 'tax_amount', type: 'REAL', nullable: false, description: 'Sales and VAT tax charge' },
      { name: 'total_amount', type: 'REAL', nullable: false, description: 'Final settled payment amount' },
      { name: 'payment_method', type: 'TEXT', nullable: false, description: 'Credit Card, PayPal, Apple Pay, Wire' },
      { name: 'shipping_city', type: 'TEXT', nullable: true, description: 'Destination delivery city' },
      { name: 'shipping_country', type: 'TEXT', nullable: false, description: 'Destination ISO country' },
    ],
    recommendedQueries: [
      {
        title: 'Monthly Revenue & Rolling 3-Month Average',
        description: 'Calculate total revenue per month and smooth it with a 3-month rolling window.',
        sql: `SELECT \n  strftime('%Y-%m', order_date) AS order_month,\n  COUNT(order_id) AS total_orders,\n  ROUND(SUM(total_amount), 2) AS monthly_revenue,\n  ROUND(AVG(SUM(total_amount)) OVER (\n    ORDER BY strftime('%Y-%m', order_date)\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n  ), 2) AS rolling_3m_avg_revenue\nFROM orders\nWHERE status = 'completed'\nGROUP BY 1\nORDER BY 1;`,
      },
      {
        title: 'Order Status Distribution & Cancellation Rate',
        description: 'Aggregate orders by status to assess pipeline efficiency.',
        sql: `SELECT \n  status,\n  COUNT(*) AS count,\n  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders), 2) AS percentage\nFROM orders\nGROUP BY status\nORDER BY count DESC;`,
      },
    ],
  },
  {
    id: 'customers',
    tableName: 'customers',
    domain: 'E-Commerce & Retail',
    domainCategory: 'ecommerce',
    description: 'Registered consumers, demographics, and account lifecycle data.',
    keywords: ['customer', 'buyer', 'client', 'shopper', 'user', 'member', 'account'],
    pattern: /^(customers?|buyers?|shoppers?|clients?)/i,
    canonicalColumns: [
      { name: 'customer_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Primary customer key' },
      { name: 'first_name', type: 'TEXT', nullable: false, description: 'First name' },
      { name: 'last_name', type: 'TEXT', nullable: false, description: 'Last name' },
      { name: 'email', type: 'TEXT', nullable: false, description: 'Primary contact email' },
      { name: 'phone', type: 'TEXT', nullable: true, description: 'Phone number' },
      { name: 'country', type: 'TEXT', nullable: false, description: 'Residence country' },
      { name: 'city', type: 'TEXT', nullable: true, description: 'Residence city' },
      { name: 'customer_tier', type: 'TEXT', nullable: false, description: 'Standard, Gold, Platinum, VIP' },
      { name: 'signup_date', type: 'DATETIME', nullable: false, description: 'Registration timestamp' },
      { name: 'is_active', type: 'BOOLEAN', nullable: false, description: 'Active account status flag' },
    ],
    recommendedQueries: [
      {
        title: 'Customer Cohort Signup Velocity by Country',
        description: 'Track geographic acquisition rate over time.',
        sql: `SELECT \n  country,\n  customer_tier,\n  COUNT(*) AS total_customers,\n  MIN(signup_date) AS earliest_signup,\n  MAX(signup_date) AS latest_signup\nFROM customers\nGROUP BY country, customer_tier\nORDER BY total_customers DESC;`,
      },
    ],
  },
  {
    id: 'products',
    tableName: 'products',
    domain: 'E-Commerce & Retail',
    domainCategory: 'ecommerce',
    description: 'Catalog items, inventory stock, categories, and unit pricing.',
    keywords: ['product', 'item', 'inventory', 'sku', 'catalog', 'merchandise', 'goods'],
    pattern: /^(products?|items?|catalog|skus?|merchandise)/i,
    canonicalColumns: [
      { name: 'product_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique product SKU ID' },
      { name: 'product_name', type: 'TEXT', nullable: false, description: 'Commercial product name' },
      { name: 'category', type: 'TEXT', nullable: false, description: 'Electronics, Apparel, Home, Sports, Books' },
      { name: 'unit_price', type: 'REAL', nullable: false, description: 'Retail listing price' },
      { name: 'cost_price', type: 'REAL', nullable: false, description: 'Wholesale acquisition cost' },
      { name: 'stock_quantity', type: 'INTEGER', nullable: false, description: 'Units available in warehouse' },
      { name: 'rating', type: 'REAL', nullable: true, description: 'Average user review score (1.0 - 5.0)' },
      { name: 'is_available', type: 'BOOLEAN', nullable: false, description: 'Listed on active storefront' },
    ],
    recommendedQueries: [
      {
        title: 'Product Profit Margins and Top Stock Risk',
        description: 'Calculate unit margins and pinpoint low-stock inventory.',
        sql: `SELECT \n  category,\n  COUNT(*) AS item_count,\n  ROUND(AVG(unit_price), 2) AS avg_price,\n  ROUND(AVG((unit_price - cost_price) / unit_price * 100), 2) AS avg_margin_pct,\n  SUM(stock_quantity) AS total_inventory_units\nFROM products\nGROUP BY category\nORDER BY avg_margin_pct DESC;`,
      },
    ],
  },

  // ── 2. Fintech & Banking ────────────────────────────────────────────
  {
    id: 'transactions',
    tableName: 'transactions',
    domain: 'Fintech & Banking',
    domainCategory: 'fintech',
    description: 'Ledger financial transactions, card debits, transfers, and fraud signals.',
    keywords: ['transaction', 'payment', 'transfer', 'ledger', 'charge', 'withdrawal', 'deposit', 'bank', 'fintech'],
    pattern: /^(transactions?|payments?|transfers?|charges?|debits?|deposits?|ledger)/i,
    canonicalColumns: [
      { name: 'transaction_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique transaction reference' },
      { name: 'account_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: { table: 'accounts', column: 'account_id' }, description: 'Originating bank account' },
      { name: 'merchant_id', type: 'INTEGER', nullable: true, description: 'Recipient merchant ID' },
      { name: 'amount', type: 'REAL', nullable: false, description: 'Signed monetary value' },
      { name: 'currency', type: 'TEXT', nullable: false, description: 'USD, EUR, GBP, CAD, JPY' },
      { name: 'transaction_type', type: 'TEXT', nullable: false, description: 'debit, credit, wire, atm_withdrawal, refund' },
      { name: 'status', type: 'TEXT', nullable: false, description: 'authorized, settled, declined, disputed' },
      { name: 'fraud_score', type: 'REAL', nullable: false, description: 'ML anomaly risk score (0.00 to 1.00)' },
      { name: 'created_at', type: 'DATETIME', nullable: false, description: 'Timestamp of initiation' },
    ],
    recommendedQueries: [
      {
        title: 'High-Risk Fraud Spike Detection with Window Z-Scores',
        description: 'Flag transactions exceeding 2 standard deviations in anomaly scores.',
        sql: `SELECT \n  transaction_id,\n  account_id,\n  amount,\n  currency,\n  fraud_score,\n  created_at\nFROM transactions\nWHERE fraud_score >= 0.85 OR status = 'disputed'\nORDER BY fraud_score DESC\nLIMIT 20;`,
      },
      {
        title: 'Running Account Balance Ledger',
        description: 'Compute cumulative balance over chronological transactions.',
        sql: `SELECT \n  transaction_id,\n  account_id,\n  created_at,\n  amount,\n  SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END) OVER (\n    PARTITION BY account_id\n    ORDER BY created_at\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_balance\nFROM transactions\nORDER BY account_id, created_at;`,
      },
    ],
  },
  {
    id: 'accounts',
    tableName: 'accounts',
    domain: 'Fintech & Banking',
    domainCategory: 'fintech',
    description: 'Bank checking, savings, investment, and crypto wallet accounts.',
    keywords: ['account', 'wallet', 'portfolio', 'balance', 'checking', 'savings'],
    pattern: /^(accounts?|wallets?|portfolios?|bank_accounts?)/i,
    canonicalColumns: [
      { name: 'account_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique account number' },
      { name: 'user_id', type: 'INTEGER', nullable: false, description: 'Account holder identity' },
      { name: 'account_type', type: 'TEXT', nullable: false, description: 'checking, savings, investment, crypto_wallet' },
      { name: 'balance', type: 'REAL', nullable: false, description: 'Current available funds' },
      { name: 'currency', type: 'TEXT', nullable: false, description: 'Primary denomination currency' },
      { name: 'interest_rate', type: 'REAL', nullable: false, description: 'Annual percentage yield (APY)' },
      { name: 'opened_at', type: 'DATETIME', nullable: false, description: 'Account creation date' },
      { name: 'is_frozen', type: 'BOOLEAN', nullable: false, description: 'Regulatory freeze flag' },
    ],
    recommendedQueries: [
      {
        title: 'Total Capital Under Management by Account Type',
        description: 'Aggregate overall balance distribution across account categories.',
        sql: `SELECT \n  account_type,\n  currency,\n  COUNT(*) AS total_accounts,\n  ROUND(SUM(balance), 2) AS total_aum,\n  ROUND(AVG(balance), 2) AS mean_balance\nFROM accounts\nWHERE is_frozen = 0\nGROUP BY account_type, currency\nORDER BY total_aum DESC;`,
      },
    ],
  },

  // ── 3. SaaS & Subscriptions ─────────────────────────────────────────
  {
    id: 'subscriptions',
    tableName: 'subscriptions',
    domain: 'SaaS & Subscriptions',
    domainCategory: 'saas',
    description: 'Recurring SaaS plan tiers, monthly recurring revenue (MRR), and renewals.',
    keywords: ['subscription', 'plan', 'saas', 'mrr', 'billing', 'license', 'renewal', 'churn'],
    pattern: /^(subscriptions?|plans?|memberships?|billing_plans?|mrr)/i,
    canonicalColumns: [
      { name: 'subscription_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique subscription ID' },
      { name: 'tenant_id', type: 'INTEGER', nullable: false, description: 'B2B organization / workspace' },
      { name: 'plan_tier', type: 'TEXT', nullable: false, description: 'Starter, Professional, Enterprise, Scale' },
      { name: 'mrr_amount', type: 'REAL', nullable: false, description: 'Monthly Recurring Revenue in USD' },
      { name: 'billing_cycle', type: 'TEXT', nullable: false, description: 'monthly, annual, quarterly' },
      { name: 'seat_count', type: 'INTEGER', nullable: false, description: 'Allocated user licenses' },
      { name: 'status', type: 'TEXT', nullable: false, description: 'active, trialing, past_due, canceled, paused' },
      { name: 'started_at', type: 'DATETIME', nullable: false, description: 'Subscription commencement' },
      { name: 'churn_date', type: 'DATETIME', nullable: true, description: 'Cancellation timestamp if churned' },
    ],
    recommendedQueries: [
      {
        title: 'Net MRR & Churn Hazard Rate per Plan Tier',
        description: 'Measure monthly recurring revenue retention vs canceled accounts.',
        sql: `SELECT \n  plan_tier,\n  COUNT(*) AS total_subscriptions,\n  SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_subscriptions,\n  ROUND(SUM(CASE WHEN status = 'active' THEN mrr_amount ELSE 0 END), 2) AS active_mrr,\n  ROUND(SUM(CASE WHEN status = 'canceled' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 2) AS churn_rate_pct\nFROM subscriptions\nGROUP BY plan_tier\nORDER BY active_mrr DESC;`,
      },
    ],
  },
  {
    id: 'organizations',
    tableName: 'organizations',
    domain: 'SaaS & Subscriptions',
    domainCategory: 'saas',
    description: 'B2B corporate customer workspaces and tenant metadata.',
    keywords: ['organization', 'tenant', 'workspace', 'company', 'enterprise', 'team'],
    pattern: /^(organizations?|tenants?|workspaces?|companies?|teams?)/i,
    canonicalColumns: [
      { name: 'tenant_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique organization ID' },
      { name: 'company_name', type: 'TEXT', nullable: false, description: 'Corporate entity title' },
      { name: 'domain', type: 'TEXT', nullable: false, description: 'Corporate email web domain' },
      { name: 'industry', type: 'TEXT', nullable: false, description: 'Fintech, Healthcare, AI, Retail, Edu' },
      { name: 'employee_bracket', type: 'TEXT', nullable: false, description: '1-10, 11-50, 51-200, 201-1000, 1000+' },
      { name: 'country', type: 'TEXT', nullable: false, description: 'Headquarters ISO country' },
      { name: 'created_at', type: 'DATETIME', nullable: false, description: 'Workspace creation date' },
    ],
    recommendedQueries: [
      {
        title: 'Enterprise Distribution by Industry & Company Scale',
        description: 'Analyze company size distribution across vertical sectors.',
        sql: `SELECT \n  industry,\n  employee_bracket,\n  COUNT(*) AS company_count\nFROM organizations\nGROUP BY industry, employee_bracket\nORDER BY company_count DESC;`,
      },
    ],
  },

  // ── 4. Healthcare & Biotech ─────────────────────────────────────────
  {
    id: 'patients',
    tableName: 'patients',
    domain: 'Healthcare & Biotech',
    domainCategory: 'healthcare',
    description: 'Clinical electronic health records, patient identifiers, and vitals history.',
    keywords: ['patient', 'hospital', 'clinical', 'medical', 'doctor', 'encounter', 'diagnosis', 'health'],
    pattern: /^(patients?|medical_records?|ehr|clinical_patients?)/i,
    canonicalColumns: [
      { name: 'patient_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique patient record ID' },
      { name: 'first_name', type: 'TEXT', nullable: false, description: 'Patient legal given name' },
      { name: 'last_name', type: 'TEXT', nullable: false, description: 'Patient family name' },
      { name: 'gender', type: 'TEXT', nullable: false, description: 'Male, Female, Non-binary, Other' },
      { name: 'birth_date', type: 'DATE', nullable: false, description: 'Date of birth' },
      { name: 'blood_type', type: 'TEXT', nullable: false, description: 'A+, A-, B+, B-, O+, O-, AB+, AB-' },
      { name: 'primary_physician_id', type: 'INTEGER', nullable: true, description: 'Assigned physician NPI' },
      { name: 'insurance_provider', type: 'TEXT', nullable: true, description: 'Payer health plan' },
      { name: 'last_visit_date', type: 'DATETIME', nullable: true, description: 'Most recent clinic check-in' },
    ],
    recommendedQueries: [
      {
        title: 'Patient Age Stratification & Blood Group Distribution',
        description: 'Calculate patient age brackets for demographic epidemiologic studies.',
        sql: `SELECT \n  blood_type,\n  COUNT(*) AS patient_count,\n  ROUND(AVG((strftime('%Y', 'now') - strftime('%Y', birth_date))), 1) AS avg_age\nFROM patients\nGROUP BY blood_type\nORDER BY patient_count DESC;`,
      },
    ],
  },
  {
    id: 'encounters',
    tableName: 'clinical_encounters',
    domain: 'Healthcare & Biotech',
    domainCategory: 'healthcare',
    description: 'Hospital outpatient, inpatient, and emergency room clinical encounters.',
    keywords: ['encounter', 'visit', 'appointment', 'admission', 'diagnosis', 'triage', 'ward'],
    pattern: /^(encounters?|visits?|appointments?|admissions?|triages?)/i,
    canonicalColumns: [
      { name: 'encounter_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique encounter reference' },
      { name: 'patient_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: { table: 'patients', column: 'patient_id' }, description: 'Patient identifier' },
      { name: 'encounter_type', type: 'TEXT', nullable: false, description: 'outpatient, emergency, inpatient, telehealth' },
      { name: 'admission_date', type: 'DATETIME', nullable: false, description: 'Check-in admission timestamp' },
      { name: 'discharge_date', type: 'DATETIME', nullable: true, description: 'Discharge timestamp' },
      { name: 'primary_diagnosis_code', type: 'TEXT', nullable: false, description: 'ICD-10 clinical diagnosis code' },
      { name: 'systolic_bp', type: 'INTEGER', nullable: true, description: 'Blood pressure systolic (mmHg)' },
      { name: 'diastolic_bp', type: 'INTEGER', nullable: true, description: 'Blood pressure diastolic (mmHg)' },
      { name: 'cost_amount', type: 'REAL', nullable: false, description: 'Total encounter charge' },
    ],
    recommendedQueries: [
      {
        title: 'Average Length of Stay (LOS) by Encounter Category',
        description: 'Measure inpatient hospitalization duration in hours.',
        sql: `SELECT \n  encounter_type,\n  COUNT(*) AS total_encounters,\n  ROUND(AVG((julianday(discharge_date) - julianday(admission_date)) * 24), 2) AS avg_los_hours,\n  ROUND(AVG(cost_amount), 2) AS avg_encounter_cost\nFROM clinical_encounters\nWHERE discharge_date IS NOT NULL\nGROUP BY encounter_type;`,
      },
    ],
  },

  // ── 5. Social Media & Content Platforms ─────────────────────────────
  {
    id: 'posts',
    tableName: 'posts',
    domain: 'Social & Media',
    domainCategory: 'social',
    description: 'Social feed publications, articles, multimedia stories, and engagement counters.',
    keywords: ['post', 'tweet', 'feed', 'article', 'video', 'story', 'content', 'media', 'social'],
    pattern: /^(posts?|tweets?|threads?|articles?|videos?|stories?)/i,
    canonicalColumns: [
      { name: 'post_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique publication ID' },
      { name: 'author_id', type: 'INTEGER', nullable: false, description: 'Creator user identifier' },
      { name: 'title', type: 'TEXT', nullable: true, description: 'Post headline or title' },
      { name: 'content_type', type: 'TEXT', nullable: false, description: 'text, image, reel_video, live_stream, poll' },
      { name: 'view_count', type: 'INTEGER', nullable: false, description: 'Total impression views' },
      { name: 'like_count', type: 'INTEGER', nullable: false, description: 'Cumulative like reactions' },
      { name: 'share_count', type: 'INTEGER', nullable: false, description: 'Re-shares / retweets' },
      { name: 'comment_count', type: 'INTEGER', nullable: false, description: 'Total discussion replies' },
      { name: 'is_pinned', type: 'BOOLEAN', nullable: false, description: 'Pinned to profile header' },
      { name: 'published_at', type: 'DATETIME', nullable: false, description: 'Release publication timestamp' },
    ],
    recommendedQueries: [
      {
        title: 'Top Virality Engagement Ratio Analysis',
        description: 'Calculate engagement rate per 1,000 views across media formats.',
        sql: `SELECT \n  content_type,\n  COUNT(*) AS post_count,\n  SUM(view_count) AS total_views,\n  ROUND(AVG((like_count + comment_count * 2.0 + share_count * 3.0) / NULLIF(view_count, 0) * 1000), 2) AS virality_score_per_1k_views\nFROM posts\nGROUP BY content_type\nORDER BY virality_score_per_1k_views DESC;`,
      },
    ],
  },

  // ── 6. Logistics & Supply Chain ─────────────────────────────────────
  {
    id: 'shipments',
    tableName: 'shipments',
    domain: 'Logistics & Supply Chain',
    domainCategory: 'logistics',
    description: 'Freight parcels, route transit, delivery carriers, and estimated delivery dates.',
    keywords: ['shipment', 'delivery', 'carrier', 'tracking', 'freight', 'cargo', 'parcel', 'route', 'fleet'],
    pattern: /^(shipments?|deliveries?|tracking|freights?|cargos?|parcels?)/i,
    canonicalColumns: [
      { name: 'shipment_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Tracking shipment reference' },
      { name: 'order_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: { table: 'orders', column: 'order_id' }, description: 'Linked order number' },
      { name: 'carrier', type: 'TEXT', nullable: false, description: 'FedEx, DHL, UPS, USPS, Amazon Logistics' },
      { name: 'tracking_number', type: 'TEXT', nullable: false, description: 'Waybill tracking barcode' },
      { name: 'origin_warehouse', type: 'TEXT', nullable: false, description: 'Dispatch fulfillment center' },
      { name: 'destination_country', type: 'TEXT', nullable: false, description: 'Delivery country ISO code' },
      { name: 'weight_kg', type: 'REAL', nullable: false, description: 'Parcel gross weight' },
      { name: 'shipping_cost', type: 'REAL', nullable: false, description: 'Freight transit rate' },
      { name: 'status', type: 'TEXT', nullable: false, description: 'in_transit, delivered, out_for_delivery, delayed, exception' },
      { name: 'shipped_at', type: 'DATETIME', nullable: false, description: 'Depot departure timestamp' },
      { name: 'delivered_at', type: 'DATETIME', nullable: true, description: 'Recipient handover timestamp' },
    ],
    recommendedQueries: [
      {
        title: 'On-Time Delivery Rate & Carrier SLA Performance',
        description: 'Benchmark carrier delivery speed and delay rates.',
        sql: `SELECT \n  carrier,\n  COUNT(*) AS total_shipments,\n  ROUND(AVG((julianday(delivered_at) - julianday(shipped_at)) * 24), 1) AS avg_transit_hours,\n  SUM(CASE WHEN status = 'delayed' THEN 1 ELSE 0 END) AS delayed_count,\n  ROUND(SUM(CASE WHEN status = 'delivered' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 2) AS completion_rate_pct\nFROM shipments\nWHERE delivered_at IS NOT NULL\nGROUP BY carrier\nORDER BY avg_transit_hours ASC;`,
      },
    ],
  },

  // ── 7. Product & Telemetry Analytics ────────────────────────────────
  {
    id: 'events',
    tableName: 'web_events',
    domain: 'Product & Telemetry',
    domainCategory: 'analytics',
    description: 'High-frequency telemetry events, clickstream logs, sessions, and conversion funnels.',
    keywords: ['event', 'telemetry', 'clickstream', 'pageview', 'session', 'funnel', 'analytics', 'log'],
    pattern: /^(events?|web_events?|pageviews?|sessions?|clicks?|telemetry)/i,
    canonicalColumns: [
      { name: 'event_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique telemetry event ID' },
      { name: 'session_id', type: 'TEXT', nullable: false, description: 'Browser session UUID' },
      { name: 'user_id', type: 'INTEGER', nullable: true, description: 'Authenticated user ID (null for guests)' },
      { name: 'event_name', type: 'TEXT', nullable: false, description: 'page_view, button_click, signup_submit, checkout_start, error' },
      { name: 'page_path', type: 'TEXT', nullable: false, description: 'Route URI path (/dashboard, /pricing, etc.)' },
      { name: 'device_category', type: 'TEXT', nullable: false, description: 'mobile, desktop, tablet' },
      { name: 'browser', type: 'TEXT', nullable: false, description: 'Chrome, Safari, Firefox, Edge' },
      { name: 'country', type: 'TEXT', nullable: false, description: 'Client geo-IP country' },
      { name: 'duration_ms', type: 'INTEGER', nullable: false, description: 'Time spent on interaction' },
      { name: 'timestamp', type: 'DATETIME', nullable: false, description: 'Client log event timestamp' },
    ],
    recommendedQueries: [
      {
        title: 'Funnel Step Dropoff Analysis',
        description: 'Count distinct sessions traversing the conversion funnel.',
        sql: `SELECT \n  event_name,\n  COUNT(DISTINCT session_id) AS unique_sessions,\n  COUNT(*) AS total_hits,\n  ROUND(AVG(duration_ms), 1) AS avg_duration_ms\nFROM web_events\nGROUP BY event_name\nORDER BY unique_sessions DESC;`,
      },
    ],
  },

  // ── 8. Human Resources & Org ────────────────────────────────────────
  {
    id: 'employees',
    tableName: 'employees',
    domain: 'Human Resources & Org',
    domainCategory: 'hr',
    description: 'Staff profiles, compensation, departmental hierarchy, and tenure records.',
    keywords: ['employee', 'staff', 'worker', 'department', 'salary', 'payroll', 'hr', 'job'],
    pattern: /^(employees?|staff|workers?|personnel|payroll)/i,
    canonicalColumns: [
      { name: 'employee_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique badge ID' },
      { name: 'first_name', type: 'TEXT', nullable: false, description: 'Given name' },
      { name: 'last_name', type: 'TEXT', nullable: false, description: 'Family name' },
      { name: 'email', type: 'TEXT', nullable: false, description: 'Corporate email' },
      { name: 'department', type: 'TEXT', nullable: false, description: 'Engineering, Product, Sales, Marketing, HR, Finance' },
      { name: 'job_title', type: 'TEXT', nullable: false, description: 'Senior Data Engineer, Product Manager, etc.' },
      { name: 'salary', type: 'REAL', nullable: false, description: 'Annual base compensation (USD)' },
      { name: 'manager_id', type: 'INTEGER', nullable: true, isForeignKey: true, references: { table: 'employees', column: 'employee_id' }, description: 'Reporting manager ID' },
      { name: 'hire_date', type: 'DATE', nullable: false, description: 'Start date' },
      { name: 'is_active', type: 'BOOLEAN', nullable: false, description: 'Current active employee flag' },
    ],
    recommendedQueries: [
      {
        title: 'Departmental Salary Quartiles & DENSE_RANK() Top Earners',
        description: 'Rank highest compensated employees within each department.',
        sql: `SELECT \n  department,\n  employee_id,\n  first_name || ' ' || last_name AS full_name,\n  salary,\n  DENSE_RANK() OVER (\n    PARTITION BY department \n    ORDER BY salary DESC\n  ) AS salary_rank\nFROM employees\nWHERE is_active = 1\nORDER BY department, salary_rank;`,
      },
    ],
  },

  // ── 9. Real Estate & Hospitality ────────────────────────────────────
  {
    id: 'properties',
    tableName: 'hotel_bookings',
    domain: 'Real Estate & Hospitality',
    domainCategory: 'hospitality',
    description: 'Lodging listings, hotel room reservations, nightly rates, and guest reviews.',
    keywords: ['hotel', 'booking', 'room', 'reservation', 'guest', 'listing', 'property', 'stay', 'airbnb'],
    pattern: /^(hotels?|bookings?|reservations?|rooms?|properties?|listings?|stays?)/i,
    canonicalColumns: [
      { name: 'booking_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique reservation ID' },
      { name: 'guest_id', type: 'INTEGER', nullable: false, description: 'Guest account identifier' },
      { name: 'property_name', type: 'TEXT', nullable: false, description: 'Hotel / Resort / Villa title' },
      { name: 'room_type', type: 'TEXT', nullable: false, description: 'Standard, Deluxe Suite, Penthouse, Studio' },
      { name: 'check_in_date', type: 'DATE', nullable: false, description: 'Arrival date' },
      { name: 'check_out_date', type: 'DATE', nullable: false, description: 'Departure date' },
      { name: 'nightly_rate', type: 'REAL', nullable: false, description: 'Base price per night' },
      { name: 'total_charge', type: 'REAL', nullable: false, description: 'Final settled amount' },
      { name: 'status', type: 'TEXT', nullable: false, description: 'confirmed, checked_in, checked_out, cancelled' },
      { name: 'rating', type: 'REAL', nullable: true, description: 'Post-stay guest rating (1.0 - 5.0)' },
    ],
    recommendedQueries: [
      {
        title: 'Average Daily Rate (ADR) & Stay Duration',
        description: 'Calculate average length of stay and revenue per room type.',
        sql: `SELECT \n  room_type,\n  COUNT(*) AS total_bookings,\n  ROUND(AVG(nightly_rate), 2) AS avg_nightly_rate,\n  ROUND(AVG(julianday(check_out_date) - julianday(check_in_date)), 1) AS avg_nights_stayed,\n  ROUND(SUM(total_charge), 2) AS total_revenue\nFROM hotel_bookings\nWHERE status IN ('confirmed', 'checked_out')\nGROUP BY room_type\nORDER BY total_revenue DESC;`,
      },
    ],
  },

  // ── 10. Gaming & Esports ────────────────────────────────────────────
  {
    id: 'matches',
    tableName: 'match_stats',
    domain: 'Gaming & Esports',
    domainCategory: 'gaming',
    description: 'Player match outcomes, kills/deaths/assists (KDA), MMR ranking, and weapon telemetry.',
    keywords: ['game', 'match', 'player', 'esports', 'score', 'kda', 'ranking', 'mmr', 'guild', 'loot'],
    pattern: /^(games?|matches?|players?|leaderboards?|esports?|match_stats)/i,
    canonicalColumns: [
      { name: 'match_id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Unique match lobby ID' },
      { name: 'player_id', type: 'INTEGER', nullable: false, description: 'Gamer account ID' },
      { name: 'character_class', type: 'TEXT', nullable: false, description: 'Warrior, Mage, Rogue, Paladin, Archer' },
      { name: 'match_result', type: 'TEXT', nullable: false, description: 'victory, defeat, draw' },
      { name: 'kills', type: 'INTEGER', nullable: false, description: 'Eliminations scored' },
      { name: 'deaths', type: 'INTEGER', nullable: false, description: 'Times eliminated' },
      { name: 'assists', type: 'INTEGER', nullable: false, description: 'Assists contributed' },
      { name: 'damage_dealt', type: 'REAL', nullable: false, description: 'Total combat damage output' },
      { name: 'mmr_rating', type: 'INTEGER', nullable: false, description: 'Matchmaking rating (1000 - 3000)' },
      { name: 'played_at', type: 'DATETIME', nullable: false, description: 'Match timestamp' },
    ],
    recommendedQueries: [
      {
        title: 'Class Win Rates & Average KDA Ratio',
        description: 'Benchmark character class balance and damage efficiency.',
        sql: `SELECT \n  character_class,\n  COUNT(*) AS total_matches,\n  ROUND(SUM(CASE WHEN match_result = 'victory' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 2) AS win_rate_pct,\n  ROUND(AVG((kills + assists * 0.5) / NULLIF(deaths, 0)), 2) AS avg_kda,\n  ROUND(AVG(damage_dealt), 1) AS avg_damage\nFROM match_stats\nGROUP BY character_class\nORDER BY win_rate_pct DESC;`,
      },
    ],
  },
];
