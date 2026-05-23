import { Topic } from '../../types/content';

export const powerBITopics: Topic[] = [
  {
    id: 'bi-intro',
    slug: 'intro',
    title: 'Introduction to Power BI',
    description: 'The industry standard for interactive dashboards and business intelligence.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    sections: {
      what: {
        text: 'Power BI is a collection of software services, apps, and connectors that work together to turn your unrelated sources of data into coherent, visually immersive, and interactive insights.\n\nIn the modern enterprise, data is scattered everywhere: Excel files on local drives, SQL databases on local servers, and cloud services like Salesforce or Google Analytics. Power BI acts as a centralized bridge. It pulls data from hundreds of connectors, allows you to clean and shape the data, and then build relational models to connect it all together.\n\nThe final output is a dynamic, interactive dashboard. Unlike static Excel charts, Power BI visuals cross-filter each other. If you click on a specific product category in a bar chart, every other visual on the page immediately updates to reflect that category\'s data. This interactivity allows executives and analysts to intuitively "drill down" into the data to discover hidden trends.',
        eli5: 'It\'s like a magic dashboard that connects to all your messy spreadsheets and databases, and turns them into beautiful, clickable charts.'
      },
      breakdown: {
        components: [
          { title: 'Power Query', description: 'Used to extract, transform, and load (ETL) data from any source.' },
          { title: 'Power Pivot', description: 'Used for data modeling and DAX formula calculations.' },
          { title: 'Power View', description: 'Used for creating interactive visualizations and dashboards.' }
        ]
      },
      diagram: {
        chart: 'graph LR\n  A[Excel] -->|Load| PQ[Power Query]\n  B[SQL DB] -->|Load| PQ\n  PQ -->|Transform| PP[Power Pivot]\n  PP -->|Model| PV[Dashboard]\n  PV -->|Share| PBI[Power BI Service]'
      },
      examNotes: {
        examNotes: [
          'Power BI Desktop = free tool for building reports',
          'Power BI Service = cloud platform for sharing/collaboration',
          'Power Query = ETL tool (M language)',
          'DAX = Data Analysis Expressions (calculation language)',
          'Measures are calculated at query time; Calculated Columns are computed at refresh'
        ]
      }
    },
    interviewQuestions: [
      { question: 'What are the main components of Power BI?', answer: 'Power Query (Data Transformation), Power Pivot (Data Modeling Engine with DAX), Power View (Data Visualization), and Power BI Service (Sharing/Collaboration in the cloud).', difficulty: 'Fresher', category: 'Conceptual' }
    ]
  },
  {
    id: 'bi-dax',
    slug: 'dax-basics',
    title: 'DAX Formulas',
    description: 'Data Analysis Expressions for custom calculations and measures.',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    sections: {
      what: {
        text: 'DAX (Data Analysis Expressions) is a library of functions and operators that can be combined to build formulas and expressions in Power BI.\n\nWhile Power BI\'s drag-and-drop interface is great for basic charts, real business logic requires custom calculations. This is where DAX comes in. DAX allows you to calculate Year-over-Year growth, cumulative totals, rolling averages, and complex filtering logic that standard aggregations cannot handle.\n\nDAX introduces two primary calculation types: Calculated Columns and Measures. A calculated column is computed row-by-row during data refresh, permanently adding data to the table. A measure, on the other hand, is calculated "on the fly" when a user interacts with a report.',
        eli5: 'It\'s like Excel formulas on steroids. Instead of calculating a single cell, DAX calculates over entire tables and columns based on filters.'
      },
      breakdown: {
        components: [
          { title: 'Calculated Columns', description: 'Computed row-by-row based on other columns. Stored in memory.' },
          { title: 'Measures', description: 'Aggregated values that respond dynamically to dashboard filters (context-dependent).' },
          { title: 'CALCULATE()', description: 'The most important DAX function. Evaluates an expression in a modified filter context.' }
        ]
      },
      code: {
        code: `-- DAX Measure examples
-- Year-to-Date Sales
YTD Sales = CALCULATE(SUM(Sales[Amount]), DATESYTD(Calendar[Date]))

-- Year-over-Year Growth %
YoY Growth % = 
DIVIDE(
    [Total Sales] - CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Calendar[Date])),
    CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Calendar[Date]))
) * 100

-- Running Total
Running Total = CALCULATE(SUM(Sales[Amount]), FILTER(ALL(Calendar[Date]), Calendar[Date] <= MAX(Calendar[Date])))`,
        breakdown: [
          { line: 'CALCULATE([Total Sales], SAMEPERIODLASTYEAR(...))', explanation: 'Evaluates Total Sales measure in a modified context — shifted back exactly one year.' },
          { line: 'DIVIDE(numerator, denominator)', explanation: 'Safe division that returns BLANK instead of error if denominator is 0.' }
        ]
      },
      examNotes: {
        examNotes: [
          'Measure vs Calculated Column: measures are dynamic (respond to filters), columns are static (stored)',
          'CALCULATE() = most powerful DAX function — modifies the filter context',
          'ALL() removes filters from a table/column',
          'FILTER() creates a new table based on a condition',
          'Time Intelligence: DATESYTD, SAMEPERIODLASTYEAR, DATEADD'
        ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between a Calculated Column and a Measure?', answer: 'Calculated columns are evaluated row-by-row at data refresh time and stored physically in the data model — they consume memory. Measures are evaluated dynamically at query time based on the current filter context in the report — they use minimal memory but require computation at report runtime.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  }
,
{
    "id": "pb-report-design-interactivity",
    "slug": "power-bi-report-design-interactivity",
    "title": "Power BI Report Design & Advanced Interactivity",
    "description": "Master the art of creating compelling and interactive Power BI reports, moving beyond basic visualizations to craft engaging user experiences with advanced features like bookmarks, drill-through, and custom tooltips.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 90,
    "tags": [
      "Report Design",
      "Visualizations",
      "Interactivity",
      "UX",
      "Bookmarks",
      "Drill-Through"
    ],
    "sections": {
      "what": {
        "text": "Effective Power BI report design is crucial for clear data communication and user adoption. This topic explores the principles of good report design, emphasizing visual hierarchy, consistency, and user experience. We will delve into advanced visualization techniques beyond standard charts, including the strategic use of conditional formatting, custom visuals from AppSource, and small multiples for comparative analysis.\n\nA core focus will be on enhancing report interactivity. This includes implementing drill-through pages to provide granular detail upon user selection, configuring sync slicers for unified filtering across multiple pages, and leveraging bookmarks to create guided narratives or personalized views within a single report. We'll also cover advanced custom tooltips that can display additional data or even another visual when hovering over data points, and how to apply themes for consistent branding and aesthetics.",
        "eli5": "Imagine your Power BI report is a storybook. Instead of just showing simple pictures, we'll learn how to make it a pop-up book with secret doors and hidden information. You can click on a character to learn more about them, or flip to a different scene with one click, making your story much more exciting and easy to understand for whoever is reading it.",
        "points": [
          "Understand core principles of effective report design and data storytelling.",
          "Implement advanced visualization techniques including custom visuals and conditional formatting.",
          "Configure drill-through functionality for detailed analysis.",
          "Utilize bookmarks to create guided tours and dynamic report views.",
          "Design informative and interactive custom tooltips.",
          "Apply Power BI themes for consistent branding and aesthetics."
        ]
      },
      "code": {
        "code": "# Power BI doesn't involve traditional 'code' for these features, but rather UI configuration.\n# This 'code' section will illustrate a DAX measure used within a custom tooltip or conditional formatting.\n\n# Example DAX for a custom tooltip measure showing 'Change from Previous Month'\n# This measure would be added to the 'Tooltips' well of a visual.\nChange from Previous Month (Tooltip) = \nVAR CurrentMonthSales = SUM('Sales'[SalesAmount])\nVAR PreviousMonthSales = CALCULATE(SUM('Sales'[SalesAmount]), PREVIOUSMONTH('Date'[Date]))\nVAR Change = CurrentMonthSales - PreviousMonthSales\nRETURN\nIF(\n    NOT ISBLANK(CurrentMonthSales) && NOT ISBLANK(PreviousMonthSales),\n    FORMAT(Change, \"Currency\") & \" (\" & FORMAT(DIVIDE(Change, PreviousMonthSales), \"0.0%\") & \")\",\n    \"N/A\"\n)\n\n# Example for Conditional Formatting Rule (DAX Expression for background color)\n# This DAX measure would be used in the 'Format by rules' or 'Format by field value' option.\n# Green for positive change, Red for negative change.\nBackgroundColorRule = \nVAR CurrentMonthSales = SUM('Sales'[SalesAmount])\nVAR PreviousMonthSales = CALCULATE(SUM('Sales'[SalesAmount]), PREVIOUSMONTH('Date'[Date]))\nVAR Change = CurrentMonthSales - PreviousMonthSales\nRETURN\nIF(Change > 0, \"#00FF00\", IF(Change < 0, \"#FF0000\", \"#FFFFFF\")) # Green, Red, White\n",
        "breakdown": [
          {
            "line": "Change from Previous Month (Tooltip) =",
            "explanation": "Defines a new measure named 'Change from Previous Month (Tooltip)'."
          },
          {
            "line": "VAR CurrentMonthSales = SUM('Sales'[SalesAmount])",
            "explanation": "Calculates total sales for the current month in context."
          },
          {
            "line": "VAR PreviousMonthSales = CALCULATE(SUM('Sales'[SalesAmount]), PREVIOUSMONTH('Date'[Date]))",
            "explanation": "Calculates total sales for the previous month using PREVIOUSMONTH."
          },
          {
            "line": "VAR Change = CurrentMonthSales - PreviousMonthSales",
            "explanation": "Determines the difference in sales between current and previous months."
          },
          {
            "line": "RETURN",
            "explanation": "Keyword indicating the start of the measure's result expression."
          },
          {
            "line": "IF( NOT ISBLANK(CurrentMonthSales) && NOT ISBLANK(PreviousMonthSales),",
            "explanation": "Checks if both current and previous month sales are not blank to avoid errors."
          },
          {
            "line": "FORMAT(Change, \"Currency\") & \" (\" & FORMAT(DIVIDE(Change, PreviousMonthSales), \"0.0%\") & \")\",",
            "explanation": "Formats the change as currency and percentage, then concatenates them."
          },
          {
            "line": "\"N/A\")",
            "explanation": "Returns 'N/A' if data is not available for calculation."
          },
          {
            "line": "BackgroundColorRule =",
            "explanation": "Defines a measure for conditional formatting."
          },
          {
            "line": "IF(Change > 0, \"#00FF00\", IF(Change < 0, \"#FF0000\", \"#FFFFFF\"))",
            "explanation": "Returns hex color codes: green for positive change, red for negative, white otherwise."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Bookmarks capture the state of a report page (filters, slicers, visibility of visuals, drill state).",
          "Drill-through allows navigation from one report page to another, passing selected filters.",
          "Custom tooltips can display dynamic content or even an entire visual on hover.",
          "Conditional formatting applies visual cues (colors, icons, data bars) based on data values.",
          "Report themes ensure consistent branding and visual design across all pages.",
          "Consider audience and purpose when designing reports; simplicity often trumps complexity."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which Power BI feature allows you to save specific filtered states and visual configurations to create a guided storytelling experience?",
            "options": [
              "A. Drill-through",
              "B. Sync Slicers",
              "C. Bookmarks",
              "D. Custom Tooltips"
            ],
            "correctIndex": 2,
            "explanation": "Bookmarks are used to save the current state of a report page, including filters, slicers, and visual properties, allowing users to jump between predefined views."
          },
          {
            "question": "You want to show detailed information about a specific product when a user clicks on it in a summary chart. Which feature would you configure?",
            "options": [
              "A. Conditional Formatting",
              "B. Drill-through",
              "C. Q&A Visual",
              "D. Report Themes"
            ],
            "correctIndex": 1,
            "explanation": "Drill-through allows users to right-click on a data point in one visual and navigate to another page, carrying the filter context of the selected data."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Describe a scenario where you would use Power BI bookmarks. How do they enhance user experience?",
        "answer": "Bookmarks are excellent for creating guided presentations or allowing users to toggle between different views of the same data without re-applying filters manually. For example, I might create bookmarks for 'Sales by Region', 'Sales by Product Line', and 'Sales Over Time' on a single page, each with different visuals visible or filters applied. This enhances UX by reducing complexity, guiding users through insights, and personalizing their viewing experience.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "What are some best practices for designing user-friendly and performant Power BI reports?",
        "answer": "Best practices include: 1. Keeping report pages focused on a single topic. 2. Using consistent color schemes and fonts (themes). 3. Prioritizing key information with clear visual hierarchy. 4. Optimizing data models for performance (star schema). 5. Limiting the number of visuals per page to prevent clutter and improve load times. 6. Providing clear navigation (e.g., page navigation buttons with bookmarks). 7. Utilizing tooltips and drill-through for detail on demand.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "pb-service-publishing-security-apps",
    "slug": "power-bi-service-publishing-security-apps",
    "title": "Power BI Service: Publishing, Security & Apps",
    "description": "Learn how to publish, share, and secure your Power BI reports and dashboards within the Power BI Service, including managing workspaces, setting up Row-Level Security (RLS), and distributing content via Power BI Apps.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 120,
    "tags": [
      "Power BI Service",
      "Publishing",
      "Security",
      "RLS",
      "Workspaces",
      "Apps",
      "Data Gateway",
      "Refresh"
    ],
    "sections": {
      "what": {
        "text": "The Power BI Service is the cloud-based platform where reports and dashboards are shared, consumed, and managed. This topic covers the critical steps involved after developing a report in Power BI Desktop. We'll start with publishing reports and datasets to workspaces, which serve as collaborative environments for teams.\n\nKey aspects include understanding workspace roles (Admin, Member, Contributor, Viewer) and their permissions. A major focus will be on implementing Row-Level Security (RLS) to restrict data access based on user roles, covering both static RLS (manually assigning users to roles) and dynamic RLS (using DAX functions like USERPRINCIPALNAME() to automatically filter data based on the logged-in user).\n\nWe will also explore the creation and management of Power BI Apps, which provide a structured way to distribute curated content to a broad audience, offering a simplified navigation experience. Finally, we'll discuss setting up scheduled data refreshes to ensure reports display up-to-date information, and the role of the On-premises Data Gateway for connecting to data sources not directly accessible from the cloud.",
        "eli5": "Imagine you've built a beautiful LEGO castle (your report). The Power BI Service is like your fancy display shelf where you put the castle so others can see it. We'll learn how to put it on the shelf, decide who gets to see which parts (like only letting the king see the treasure room), and put a special 'fresh paint' sign so everyone knows it's always up-to-date.",
        "points": [
          "Publish reports and datasets from Power BI Desktop to the Power BI Service.",
          "Understand and manage Power BI Workspaces and associated roles.",
          "Implement Row-Level Security (RLS) to control data access for different users.",
          "Create and manage Power BI Apps for controlled content distribution.",
          "Configure scheduled data refreshes for up-to-date reports.",
          "Understand the purpose and basic setup of the On-premises Data Gateway."
        ]
      },
      "code": {
        "code": "# Power BI doesn't involve traditional 'code' for publishing, but rather UI configuration.\n# This 'code' section illustrates DAX used for dynamic Row-Level Security (RLS).\n\n# Scenario: A sales manager should only see sales data for their specific region.\n# The 'Employees' table has 'EmailAddress' and 'Region' columns.\n# The 'Sales' table has a 'Region' column.\n\n# 1. Define a Role in Power BI Desktop (e.g., 'SalesManagerRole')\n# 2. Add a table filter using DAX for the relevant table (e.g., 'Sales' table):\n\n[Region] IN SELECTCOLUMNS(\n    FILTER(\n        'Employees',\n        'Employees'[EmailAddress] = USERPRINCIPALNAME()\n    ),\n    \"Region\", 'Employees'[Region]\n)\n\n# Explanation:\n# - USERPRINCIPALNAME(): Returns the UPN (email address) of the currently logged-in user.\n# - FILTER('Employees', 'Employees'[EmailAddress] = USERPRINCIPALNAME()): Filters the Employees table\n#   to find the row corresponding to the current user.\n# - SELECTCOLUMNS(..., \"Region\", 'Employees'[Region']): Extracts the 'Region' for that user.\n# - [Region] IN ...: Compares the 'Region' column in the 'Sales' table with the region(s) associated\n#   with the logged-in user, allowing access only to matching rows.\n\n# After applying this RLS role in Power BI Desktop, you publish the report.\n# In the Power BI Service, you then assign users/groups to this 'SalesManagerRole'.\n",
        "breakdown": [
          {
            "line": "[Region] IN SELECTCOLUMNS(",
            "explanation": "Checks if the current row's 'Region' value is present in the list generated by the inner expression."
          },
          {
            "line": "FILTER('Employees', 'Employees'[EmailAddress] = USERPRINCIPALNAME())",
            "explanation": "Filters the 'Employees' table to find the row(s) where the 'EmailAddress' matches the logged-in user's email."
          },
          {
            "line": "\"Region\", 'Employees'[Region]",
            "explanation": "From the filtered 'Employees' table, selects only the 'Region' column, creating a table of regions for the current user."
          },
          {
            "line": "USERPRINCIPALNAME()",
            "explanation": "DAX function that returns the User Principal Name (usually the email address) of the user currently viewing the report."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Workspaces are containers for reports, datasets, dashboards, and dataflows, enabling collaboration.",
          "Power BI Apps are a curated collection of content distributed to a broad audience, simplifying navigation.",
          "Row-Level Security (RLS) filters data based on user roles, implemented using DAX expressions.",
          "Dynamic RLS is preferred for large user bases as it scales better than static RLS.",
          "Scheduled refresh keeps datasets up-to-date; requires a gateway for on-premises data sources.",
          "On-premises Data Gateway acts as a bridge for Power BI Service to connect to local data sources."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following is primarily used to distribute a curated collection of reports and dashboards to a large, diverse audience in a simplified, managed experience?",
            "options": [
              "A. Sharing individual reports",
              "B. Power BI Workspace",
              "C. Power BI App",
              "D. Direct Link Sharing"
            ],
            "correctIndex": 2,
            "explanation": "Power BI Apps are designed for broad distribution of content, providing a structured and user-friendly way for consumers to access relevant reports and dashboards."
          },
          {
            "question": "You have a report that needs to show sales data differently for managers of different regions. Which feature would you configure in Power BI Desktop before publishing?",
            "options": [
              "A. Calculated Columns",
              "B. Measures",
              "C. Row-Level Security (RLS)",
              "D. Custom Tooltips"
            ],
            "correctIndex": 2,
            "explanation": "Row-Level Security (RLS) is used to restrict data access at the row level based on the user viewing the report, making it ideal for showing region-specific data to respective managers."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between sharing a report directly and creating a Power BI App. When would you use each?",
        "answer": "Sharing a report directly is suitable for ad-hoc sharing with a small number of colleagues, where you want to give them immediate access to a specific report or dashboard. It offers less control over content curation. A Power BI App, on the other hand, is for distributing a curated collection of reports and dashboards to a broader audience. Apps provide a simplified navigation experience, audience-specific content, version control, and easier management for consumers. You'd use an App for formal distribution to departments or external stakeholders, ensuring they only see the approved, relevant content.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "How do you implement dynamic Row-Level Security (RLS) in Power BI? What are the key components?",
        "answer": "Dynamic RLS is implemented by defining roles in Power BI Desktop with DAX expressions that leverage functions like USERPRINCIPALNAME() or USERNAME(). The key components are: 1. A dimension table in your model that contains the user identifier (e.g., email or username) and the attribute you want to filter by (e.g., Region). 2. A DAX filter expression within the RLS role that compares the user's identifier with the appropriate column in your data model, ensuring only relevant rows are displayed. 3. After publishing to the Power BI Service, you then assign users or security groups to these defined roles, and Power BI dynamically filters the data based on the logged-in user's identity.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "pb-dataflows-enterprise-etl",
    "slug": "power-bi-dataflows-enterprise-etl",
    "title": "Power BI Dataflows for Enterprise ETL",
    "description": "Discover Power BI Dataflows as a cloud-based, reusable ETL solution. Learn how to transform and prepare data once for consumption across multiple datasets and reports, promoting data consistency and reducing refresh times.",
    "difficulty": "Advanced",
    "estimatedMinutes": 105,
    "tags": [
      "Dataflows",
      "ETL",
      "Cloud Transformation",
      "Power Query Online",
      "Common Data Model",
      "Enterprise BI"
    ],
    "sections": {
      "what": {
        "text": "Power BI Dataflows represent a powerful, cloud-native ETL (Extract, Transform, Load) capability within the Power BI Service, extending the data preparation power of Power Query to the cloud. Instead of each Power BI Desktop file connecting directly to source systems and performing its own transformations, dataflows allow organizations to define, centralize, and reuse common data preparation logic.\n\nA dataflow consists of entities, which are essentially tables defined with Power Query M expressions. Once created, these entities can be refreshed in the Power BI Service and stored in Azure Data Lake Storage Gen2 in a Common Data Model (CDM) folder format. This enables multiple datasets, reports, and even other dataflows to consume the prepared data without having to re-transform it from the source, leading to significant benefits such as a single source of truth, reduced load on source systems, and faster dataset refresh times.\n\nWe will explore different types of dataflows (standard and analytical), how to link entities from other dataflows, create computed entities for advanced transformations, and understand their role in building robust, scalable enterprise-grade BI solutions.",
        "eli5": "Imagine everyone in a big office needs the same ingredients for their reports, like 'clean customer names' or 'calculated sales totals'. Instead of everyone cleaning and calculating these themselves, which takes time and might lead to different results, Dataflows are like a central kitchen that prepares these ingredients once, perfectly, and then everyone just picks up what they need. It makes everything faster, consistent, and less messy.",
        "points": [
          "Understand what Power BI Dataflows are and their benefits for enterprise BI.",
          "Learn to create and manage dataflows and entities in the Power BI Service.",
          "Utilize Power Query Online for cloud-based data transformations.",
          "Explore concepts of linked entities and computed entities.",
          "Grasp the role of Common Data Model (CDM) folders in dataflows.",
          "Position dataflows within an end-to-end Power BI architecture for scalability and consistency."
        ]
      },
      "code": {
        "code": "# Power BI Dataflows use Power Query M language for transformations.\n# Below is an example of an M query that might be used within a Dataflow entity\n# to clean and transform a 'Customers' table.\n\nlet\n    Source = Csv.Document(Web.Contents(\"https://raw.githubusercontent.com/datasets/ecommerce/master/data/customers.csv\"),[Delimiter=\",\", Columns={\"id\",\"first_name\",\"last_name\",\"email\",\"gender\",\"ip_address\"}, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),\n    #\"Promoted Headers\" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),\n    #\"Changed Type\" = Table.TransformColumnTypes(#\"Promoted Headers\",{{\"id\", Int64.Type}, {\"first_name\", type text}, {\"last_name\", type text}, {\"email\", type text}, {\"gender\", type text}, {\"ip_address\", type text}}),\n    #\"Combined Names\" = Table.AddColumn(#\"Changed Type\", \"FullName\", each [first_name] & \" \" & [last_name], type text),\n    #\"Cleaned Email\" = Table.TransformColumns(#\"Combined Names\",{{\"email\", Text.Lower, type text}}),\n    #\"Removed Other Columns\" = Table.SelectColumns(#\"Cleaned Email\",{\"id\", \"FullName\", \"email\", \"gender\"})\nin\n    #\"Removed Other Columns\"",
        "breakdown": [
          {
            "line": "Source = Csv.Document(Web.Contents(...))",
            "explanation": "Connects to a CSV file from a web source."
          },
          {
            "line": "#\"Promoted Headers\" = Table.PromoteHeaders(Source, ...)",
            "explanation": "Promotes the first row of data to become column headers."
          },
          {
            "line": "#\"Changed Type\" = Table.TransformColumnTypes(..., ...)",
            "explanation": "Sets the appropriate data types for each column."
          },
          {
            "line": "#\"Combined Names\" = Table.AddColumn(..., \"FullName\", each [first_name] & \" \" & [last_name], ...)",
            "explanation": "Adds a new column 'FullName' by concatenating 'first_name' and 'last_name'."
          },
          {
            "line": "#\"Cleaned Email\" = Table.TransformColumns(...,{{\"email\", Text.Lower, type text}})",
            "explanation": "Transforms the 'email' column to lowercase for consistency."
          },
          {
            "line": "#\"Removed Other Columns\" = Table.SelectColumns(...,{\"id\", \"FullName\", \"email\", \"gender\"})",
            "explanation": "Selects only a subset of columns, effectively removing unnecessary ones."
          },
          {
            "line": "in #\"Removed Other Columns\"",
            "explanation": "Specifies the final step to be returned by the query."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Dataflows centralize data preparation logic in the Power BI Service, using Power Query Online.",
          "Benefits: Single source of truth, reduced load on source systems, faster dataset refreshes, reusability.",
          "Entities are the tables within a dataflow; they can be linked (reference other entities) or computed (transformations on existing entities).",
          "Dataflows store data in Azure Data Lake Storage Gen2 in CDM folder format.",
          "Power BI datasets connect to dataflow entities as their data source.",
          "Dataflows are crucial for large-scale BI implementations requiring data governance and consistency."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "What is a primary benefit of using Power BI Dataflows for data preparation?",
            "options": [
              "A. Direct report development in the cloud",
              "B. Eliminating the need for DAX measures",
              "C. Centralizing and reusing data transformation logic",
              "D. Performing real-time data streaming"
            ],
            "correctIndex": 2,
            "explanation": "Dataflows are designed to centralize data preparation logic, allowing multiple datasets and reports to consume consistent, pre-transformed data, which is a key benefit for enterprise BI."
          },
          {
            "question": "Which component of a dataflow essentially represents a table with applied Power Query M transformations?",
            "options": [
              "A. Workspace",
              "B. Dataset",
              "C. Entity",
              "D. Dashboard"
            ],
            "correctIndex": 2,
            "explanation": "In the context of dataflows, an 'entity' is the equivalent of a table, representing a set of data with specific transformations applied using the M language."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "When would you recommend using Power BI Dataflows over simply performing all data transformations within Power BI Desktop's Power Query Editor?",
        "answer": "I would recommend Dataflows when there's a need for data reuse across multiple datasets or reports, when dealing with large datasets where offloading transformation to the cloud can improve performance, or when establishing a single source of truth for critical business entities. It's also beneficial for reducing the load on source systems, as dataflows can extract and transform data once, then make it available to many. For smaller, ad-hoc reports with unique data needs, Desktop's Power Query might suffice, but for enterprise-level consistency and scalability, Dataflows are superior.",
        "difficulty": "Mid",
        "category": "Scenario"
      },
      {
        "question": "How do Dataflows contribute to data governance and a 'single source of truth' in an organization?",
        "answer": "Dataflows promote data governance by centralizing data preparation. Instead of disparate Power BI Desktop files each connecting to raw sources and applying their own transformations (which can lead to inconsistencies), dataflows establish a single, approved set of transformation rules in the cloud. This ensures that any report or dataset consuming a dataflow entity is working with the same, consistently prepared data, effectively creating a 'single source of truth' for those entities. This reduces errors, improves data quality, and simplifies auditing.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "pb-performance-tuning-incremental-refresh",
    "slug": "power-bi-performance-tuning-incremental-refresh",
    "title": "Power BI Performance Tuning & Incremental Refresh",
    "description": "Optimize your Power BI solutions for speed and efficiency. Learn strategies for model design, DAX optimization, query folding, and master the configuration of incremental refresh for large datasets.",
    "difficulty": "Advanced",
    "estimatedMinutes": 150,
    "tags": [
      "Performance",
      "Optimization",
      "Incremental Refresh",
      "DAX Optimization",
      "Data Modeling",
      "Query Folding",
      "Large Datasets"
    ],
    "sections": {
      "what": {
        "text": "Optimizing Power BI solution performance is critical for large datasets and complex reports. This topic delves into advanced techniques to identify and resolve performance bottlenecks. We'll begin with data model optimization, emphasizing the importance of a star schema design, appropriate data types, and managing cardinality to reduce memory footprint and improve query speed. DAX formula optimization will be covered in detail, focusing on efficient patterns, avoiding inefficient iterator functions where possible, and understanding filter context propagation.\n\nA key concept is Query Folding, where Power BI translates Power Query transformations back into the source database's native query language, significantly improving refresh performance. We will explore how to maximize query folding and diagnose when it breaks. Finally, we'll dive deep into Incremental Refresh, a crucial feature for handling very large datasets. This involves setting up RangeStart and RangeEnd parameters in Power Query, defining an incremental refresh policy in Power BI Desktop, and understanding its benefits in terms of faster refresh times, reduced resource consumption, and improved reliability for massive data volumes.",
        "eli5": "Imagine you have a giant library (your data) and people want to find specific books (reports). Performance tuning is like organizing the library really well so books are easy to find and the librarians (Power BI) don't get tired. Incremental Refresh is like only updating the new books that arrived each week, instead of reorganizing the whole library every time, which saves a lot of time and effort.",
        "points": [
          "Identify and address common Power BI performance bottlenecks.",
          "Apply best practices for data model optimization (star schema, data types, cardinality).",
          "Optimize DAX expressions for faster calculation times.",
          "Understand and maximize Query Folding for efficient data loading.",
          "Configure and manage Incremental Refresh for large datasets.",
          "Troubleshoot performance issues using tools like Performance Analyzer."
        ]
      },
      "code": {
        "code": "# 1. Incremental Refresh Parameters (M Language in Power Query Editor)\n# These parameters are essential for defining the incremental refresh window.\n\nlet\n  Type = type datetimezone M let Type = type datetimezone meta [IsParameterQuery=true, IsParameterQueryRequired=true],\n  Value = #datetimezone(2023, 1, 1, 0, 0, 0, 0, 0)\n in\n  Value\n\nlet\n  Type = type datetimezone M let Type = type datetimezone meta [IsParameterQuery=true, IsParameterQueryRequired=true],\n  Value = #datetimezone(2023, 12, 31, 23, 59, 59, 0, 0)\n in\n  Value\n\n# 2. Filtering a table based on these parameters (M Language in Power Query Editor)\n# This step applies the filter based on the 'RangeStart' and 'RangeEnd' parameters\n# within your main fact table query.\n\nlet\n    Source = Sql.Database(\"your_server\", \"your_database\"),\n    dbo_Sales = Source{[Schema=\"dbo\",Item=\"Sales\"]}[Data],\n    #\"Filtered Rows\" = Table.SelectRows(dbo_Sales, each [OrderDate] >= RangeStart and [OrderDate] < RangeEnd)\nin\n    #\"Filtered Rows\"\n\n# 3. Example of DAX optimization (conceptual, showing better vs. worse)\n# Inefficient DAX (often due to context transitions or complex iteration):\n# Total Sales Inefficient = SUMX(ALL('Sales'), 'Sales'[Quantity] * RELATED('Products'[UnitPrice]))\n\n# More efficient DAX (assuming relationships are active and direct):\n# Total Sales Efficient = SUM('Sales'[Quantity] * 'Sales'[UnitPrice])\n# OR, if UnitPrice is only in Products and relation is 1:N from Products to Sales:\n# Total Sales Efficient = SUMX('Sales', 'Sales'[Quantity] * RELATED('Products'[UnitPrice])) \n# (This is efficient if RELATED is used correctly and not causing many-to-many issues)\n\n# A truly problematic DAX example causing performance issues:\n# Count of Large Orders = \n# CALCULATE(COUNTROWS('Sales'), FILTER(ALL('Sales'), 'Sales'[OrderValue] > 1000))\n# Better for performance, leveraging filter context:\n# Count of Large Orders Efficient = COUNTROWS(FILTER('Sales', 'Sales'[OrderValue] > 1000))\n",
        "breakdown": [
          {
            "line": "RangeStart",
            "explanation": "A Power Query parameter (named 'RangeStart') of type DateTimeZone. Power BI Service replaces this with the start of the current refresh window."
          },
          {
            "line": "RangeEnd",
            "explanation": "A Power Query parameter (named 'RangeEnd') of type DateTimeZone. Power BI Service replaces this with the end of the current refresh window."
          },
          {
            "line": "#\"Filtered Rows\" = Table.SelectRows(dbo_Sales, each [OrderDate] >= RangeStart and [OrderDate] < RangeEnd)",
            "explanation": "This M code step filters the 'Sales' table to include only rows where 'OrderDate' falls within the 'RangeStart' and 'RangeEnd' parameters. This is crucial for incremental refresh to work."
          },
          {
            "line": "Total Sales Inefficient = SUMX(ALL('Sales'), 'Sales'[Quantity] * RELATED('Products'[UnitPrice]))",
            "explanation": "An example of a potentially inefficient DAX measure. Using ALL() can remove useful filter context and force unnecessary iteration over the entire table."
          },
          {
            "line": "Total Sales Efficient = SUM('Sales'[Quantity] * 'Sales'[UnitPrice])",
            "explanation": "A more efficient DAX measure, performing element-wise multiplication directly within the SUM function, relying on existing filter context."
          },
          {
            "line": "Count of Large Orders Efficient = COUNTROWS(FILTER('Sales', 'Sales'[OrderValue] > 1000))",
            "explanation": "A more efficient way to count rows based on a condition, leveraging the filter argument of COUNTROWS, which is often optimized by the DAX engine."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Star schema is the optimal data model for Power BI performance (fact and dimension tables).",
          "High cardinality columns (many unique values) can negatively impact performance; minimize where possible.",
          "Query Folding is crucial; it pushes transformations back to the source database, improving refresh speed.",
          "Avoid DAX patterns that force context transitions unnecessarily or iterate over large tables inefficiently.",
          "Incremental Refresh requires RangeStart and RangeEnd parameters in Power Query and a date column in the fact table.",
          "Benefits of Incremental Refresh: Faster refreshes, less resource usage, higher reliability for large datasets."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following data model designs is generally recommended for optimal Power BI performance?",
            "options": [
              "A. Snowflake Schema",
              "B. Flat Table",
              "C. Star Schema",
              "D. Denormalized Table"
            ],
            "correctIndex": 2,
            "explanation": "The Star Schema is widely considered the best practice for Power BI data models due to its simplicity, query performance, and ease of use with DAX."
          },
          {
            "question": "What are the two essential Power Query parameters that must be defined in your data source query to enable Incremental Refresh in Power BI?",
            "options": [
              "A. StartDate & EndDate",
              "B. PeriodStart & PeriodEnd",
              "C. RangeStart & RangeEnd",
              "D. WindowStart & WindowEnd"
            ],
            "correctIndex": 2,
            "explanation": "Power BI's incremental refresh feature specifically looks for and uses parameters named 'RangeStart' and 'RangeEnd' (case-sensitive) to define the filtering window for data loading."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How do you approach troubleshooting a slow-performing Power BI report or dashboard?",
        "answer": "My approach involves several steps: 1. **Performance Analyzer:** Start here to identify slow visuals or DAX measures. 2. **Data Model Inspection:** Check for suboptimal model design (e.g., lack of star schema, too many relationships, high cardinality columns), inefficient data types, and row count. 3. **DAX Optimization:** Analyze slow measures/calculated columns for inefficient patterns, context transitions, or iterating over large tables. Use DAX Studio for detailed query analysis. 4. **Power Query/Query Folding:** Verify if query folding is happening correctly for data transformations. If not, identify breaking steps. 5. **Source System:** Ensure the underlying data source is performing well. 6. **Report Design:** Review for too many visuals, complex interactions, or unnecessary calculations on a single page. 7. **Capacity/Gateway:** Check for resource constraints on the Power BI Service or issues with the data gateway.",
        "difficulty": "Mid",
        "category": "Scenario"
      },
      {
        "question": "Explain the concept of Incremental Refresh in Power BI. Why is it important for large datasets, and how do you configure it?",
        "answer": "Incremental Refresh allows Power BI to refresh only a subset of data (e.g., new or updated rows) instead of refreshing the entire dataset. This is crucial for large datasets because it significantly reduces refresh times, minimizes resource consumption (both on Power BI Service and source systems), and improves the reliability of scheduled refreshes. To configure it: 1. Define two Power Query parameters, `RangeStart` and `RangeEnd`, of type `DateTime/DateTimeZone`. 2. Filter your fact table query in Power Query Editor using these parameters based on a date column (e.g., `OrderDate >= RangeStart and OrderDate < RangeEnd`). 3. In Power BI Desktop, right-click the table and select 'Incremental refresh policy', then configure the 'Archive data starting' and 'Incrementally refresh data starting' periods, along with optional 'Detect data changes' settings. After publishing, the Power BI Service manages the rolling window refresh.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  }
];
