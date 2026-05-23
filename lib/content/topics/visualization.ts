import { Topic } from '../../types/content';

export const visualizationTopics: Topic[] = [
  {
    id: 'viz-matplotlib',
    slug: 'matplotlib',
    title: 'Matplotlib Fundamentals',
    description: 'The foundation of Python visualization — Figure, Axes, and full control.',
    difficulty: 'Beginner',
    estimatedMinutes: 30,
    sections: {
      what: {
        text: 'Matplotlib is the foundational visualization library in Python, providing object-oriented plotting with complete control over every element of your charts. Nearly every other Python visualization library (Seaborn, Pandas plotting, scikit-learn plot utilities) is built on Matplotlib\'s backend.\n\nThe core architecture uses a two-level object model: a Figure (the entire canvas/window) which contains one or more Axes (individual plot areas). Understanding this hierarchy is key — most customization happens on the Axes object via methods like ax.set_title(), ax.set_xlabel(), ax.legend().\n\nMatplotlib\'s pyplot module provides a MATLAB-like procedural interface (plt.plot, plt.show) that is great for quick plots. But for production code, using the explicit object-oriented interface (fig, ax = plt.subplots()) gives you full control over multiple subplots and is much more readable.',
        eli5: "Matplotlib is like a blank canvas. You tell it exactly where to put every line, bar, and label. It's verbose but you can create exactly what you want.",
        tip: 'Always use fig, ax = plt.subplots() instead of pyplot functions for anything beyond a quick exploratory plot. The OO interface is more maintainable.'
      },
      code: {
        code: `import matplotlib.pyplot as plt
import numpy as np

# ── Figure + Axes (OO interface) ─────────────────────
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle('Matplotlib Visualization Suite', fontsize=16, fontweight='bold')

# 1. Line plot
x = np.linspace(0, 4*np.pi, 100)
axes[0, 0].plot(x, np.sin(x), 'b-', label='sin(x)', linewidth=2)
axes[0, 0].plot(x, np.cos(x), 'r--', label='cos(x)', linewidth=2)
axes[0, 0].set_title('Line Plot: Trigonometric Functions')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# 2. Scatter plot
np.random.seed(42)
x_scatter = np.random.randn(100)
y_scatter = 2 * x_scatter + np.random.randn(100) * 0.5
axes[0, 1].scatter(x_scatter, y_scatter, alpha=0.6, c='purple', s=30)
axes[0, 1].set_title('Scatter Plot: Correlation')
axes[0, 1].set_xlabel('Feature X')
axes[0, 1].set_ylabel('Target Y')

# 3. Bar chart
categories = ['SQL', 'Python', 'ML', 'DL', 'GenAI']
values = [85, 92, 78, 70, 88]
bars = axes[1, 0].bar(categories, values, color=['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'])
axes[1, 0].set_title('Bar Chart: Subject Scores')
axes[1, 0].set_ylim(0, 100)
# Add value labels on bars
for bar, val in zip(bars, values):
    axes[1, 0].text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1, 
                    str(val), ha='center', fontweight='bold')

# 4. Histogram
data = np.random.normal(70, 10, 1000)
axes[1, 1].hist(data, bins=30, edgecolor='black', color='#06B6D4', alpha=0.7)
axes[1, 1].axvline(data.mean(), color='red', linestyle='--', label=f'Mean: {data.mean():.1f}')
axes[1, 1].set_title('Histogram: Score Distribution')
axes[1, 1].legend()

plt.tight_layout()
plt.show()`,
        breakdown: [
          { line: 'fig, axes = plt.subplots(2, 2, figsize=(12, 8))', explanation: 'Create a 2×2 grid of subplots. axes[0,0] is top-left, axes[1,1] is bottom-right.' },
          { line: "axes[0, 0].plot(x, np.sin(x), 'b-', linewidth=2)", explanation: "'b-' = blue solid line. Other format strings: 'r--' = red dashed, 'go' = green circles." },
          { line: 'plt.tight_layout()', explanation: 'Automatically adjusts subplot spacing to prevent overlapping labels and titles.' }
        ]
      },
      examNotes: {
        examNotes: [
          'Figure = entire canvas; Axes = individual plot area',
          'fig, ax = plt.subplots() → OO interface (preferred)',
          'plt.show() → renders the plot; plt.savefig("fig.png", dpi=300) → saves',
          'Axes methods: set_title, set_xlabel, set_ylabel, legend, grid, set_xlim, set_ylim',
          'plt.subplots(nrows, ncols, figsize=(w, h)) → multiple subplots'
        ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between the pyplot interface and the object-oriented interface in Matplotlib?', answer: 'pyplot (plt.plot, plt.show) is a stateful procedural interface that implicitly works on the "current" figure/axes. The OO interface (fig, ax = plt.subplots(); ax.plot()) is explicit and more predictable. For production code, multiple subplots, or reusable functions, always use the OO interface.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },
  {
    id: 'viz-seaborn',
    slug: 'seaborn',
    title: 'Seaborn Statistical Plots',
    description: 'High-level statistical visualization with beautiful defaults.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    sections: {
      what: {
        text: 'Seaborn is a high-level data visualization library built on Matplotlib that provides beautiful statistical plots with minimal code. It is specifically designed for statistical data exploration and integrates natively with Pandas DataFrames.\n\nWith Seaborn, you can create complex visualizations (violin plots, pair plots, heatmaps, regression plots) with a single function call that would take dozens of lines in raw Matplotlib. Seaborn automatically handles data aggregation, error bars, categorical variables, and color palettes.\n\nSeaborn\'s figure-level functions (relplot, catplot, displot) create entire figures automatically, while axes-level functions (scatterplot, boxplot, heatmap) integrate into existing Matplotlib figures.',
        eli5: "Matplotlib is like drawing by hand with a pencil. Seaborn gives you pre-made stamps — just press, and you get a beautiful statistical chart with error bars and good colors automatically.",
        tip: 'Use Seaborn for exploratory data analysis (quick, beautiful). Use Matplotlib for final production charts (full control over every element).'
      },
      code: {
        code: `import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Use built-in dataset
tips = sns.load_dataset("tips")  # Restaurant tips dataset

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Distribution plot
sns.histplot(data=tips, x="total_bill", hue="sex", multiple="stack", ax=axes[0, 0])
axes[0, 0].set_title("Bill Distribution by Gender")

# 2. Box plot: distribution across categories
sns.boxplot(data=tips, x="day", y="total_bill", hue="sex", ax=axes[0, 1])
axes[0, 1].set_title("Bills by Day and Gender")

# 3. Scatter with regression line
sns.regplot(data=tips, x="total_bill", y="tip", ax=axes[1, 0], 
            scatter_kws={"alpha": 0.5}, line_kws={"color": "red"})
axes[1, 0].set_title("Tip vs Bill (with regression line)")

# 4. Heatmap: correlation matrix
corr_matrix = tips.select_dtypes(include='number').corr()
sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm", ax=axes[1, 1])
axes[1, 1].set_title("Feature Correlation Matrix")

plt.tight_layout()
plt.show()`,
        breakdown: [
          { line: "hue='sex', multiple='stack'", explanation: 'hue= colors different subgroups. multiple="stack" stacks them instead of overlapping.' },
          { line: 'sns.regplot(x, y, ...)', explanation: 'Scatter plot with a linear regression line and 95% confidence interval band — one line in Seaborn, many in Matplotlib.' },
          { line: 'tips.select_dtypes(include="number").corr()', explanation: 'Compute correlation matrix for all numeric columns. Values range -1 to 1.' }
        ]
      },
      examNotes: {
        examNotes: [
          'Seaborn = statistical plotting on top of Matplotlib',
          'hue= parameter: color-code by a categorical column',
          'Built-in datasets: tips, iris, titanic, penguins, flights',
          'sns.heatmap: great for correlation matrices',
          'sns.pairplot: scatter matrix of all pairs (EDA standard)',
          'Seaborn styles: set_style("darkgrid", "whitegrid", "dark", "white")'
        ]
      }
    },
    interviewQuestions: [
      { question: 'Why use Seaborn over Matplotlib directly?', answer: 'Seaborn requires much less code for statistical plots, integrates natively with Pandas DataFrames (pass the DataFrame and column names), has beautiful default aesthetics, automatically handles grouping (hue=), adds statistical summaries (error bars, regression lines, confidence intervals), and has a consistent, high-level API.', difficulty: 'Fresher', category: 'Conceptual' }
    ]
  }
,
{
    "id": "interactive-plotly-express",
    "slug": "interactive-plotly-express",
    "title": "Interactive Data Exploration with Plotly Express",
    "description": "Learn how to build interactive, web-ready visualizations with rich tooltips, zoom capabilities, and dynamic filtering using Plotly Express.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "plotly",
      "interactive-viz",
      "dashboarding",
      "data-exploration"
    ],
    "sections": {
      "what": {
        "text": "Plotly Express is a high-level, declarative data visualization library that produces interactive, web-based figures. Unlike static plotting libraries such as Matplotlib, Plotly figures are built using WebGL and HTML5/D3.js technologies, allowing users to hover over data points for tooltips, zoom into specific regions, pan across axes, and dynamically toggle data series on and off using interactive legends.\n\nUsing Plotly Express, you can generate complex charts like scatter plots with animation frames, map projections, facet grids, and multi-dimensional coordinate plots with minimal code. The resulting figures are fully interactive out of the box and can be easily embedded into web applications, static HTML reports, or interactive dashboards (such as Dash or Streamlit). It integrates seamlessly with Pandas DataFrames, making it an excellent tool for modern exploratory data analysis (EDA).",
        "eli5": "Think of static charts as drawings printed on paper—you can look at them, but you can't interact with them. Plotly charts are like digital video game maps. You can hover over points to see pop-up info boxes, zoom in on crowded spots, double-click to reset, and click on items in the legend to hide or show them instantly.",
        "points": [
          "Creates fully interactive HTML/JS widgets directly from Python commands.",
          "Supports dynamic tooltips (hover information) and interactive legends out of the box.",
          "Allows real-time zooming, panning, and selection on web browsers.",
          "Integrates cleanly with interactive dashboards like Dash and Streamlit."
        ]
      },
      "code": {
        "code": "import plotly.express as px\nimport pandas as pd\n\n# Sample dataset: housing metrics\ndf = pd.DataFrame({\n    'Area_sqft': [1200, 1500, 1800, 2200, 2800, 3200, 4000],\n    'Price_USD': [250000, 320000, 390000, 450000, 580000, 690000, 850000],\n    'Neighborhood': ['Suburbs', 'Downtown', 'Suburbs', 'Downtown', 'Westside', 'Westside', 'Downtown'],\n    'Year_Built': [2005, 2010, 2015, 2008, 2018, 2021, 2019]\n})\n\n# Create an interactive scatter plot\nfig = px.scatter(\n    df,\n    x='Area_sqft',\n    y='Price_USD',\n    color='Neighborhood',\n    size='Year_Built',\n    hover_name='Neighborhood',\n    hover_data={'Area_sqft': ':.0f', 'Price_USD': ':$,.2f'},\n    title='Interactive Housing Market Analysis'\n)\n\n# Update layout characteristics (e.g., hovermode)\nfig.update_layout(hovermode='closest')\n\n# Show the interactive chart (launches local server or renders in notebook)\n# fig.show()",
        "breakdown": [
          {
            "line": "import plotly.express as px",
            "explanation": "Imports Plotly Express, standardly aliased as px."
          },
          {
            "line": "fig = px.scatter(...)",
            "explanation": "Constructs the scatter plot. Binds x and y coordinates, encodes categorical variables to visual color markers, and sets variable scaling based on numerical data."
          },
          {
            "line": "hover_name='Neighborhood'",
            "explanation": "Configures the bold title shown at the top of each interactive hover tooltip box."
          },
          {
            "line": "hover_data={'Area_sqft': ':.0f', 'Price_USD': ':$,.2f'}",
            "explanation": "Explicitly formats the display patterns inside tooltips, including rounding and currency symbols."
          },
          {
            "line": "fig.update_layout(hovermode='closest')",
            "explanation": "Modifies global chart behaviors, instructing Plotly to target and display details for only the closest data point near the cursor."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Plotly is a JavaScript-based visualization library, whereas Matplotlib is primarily raster/vector static-rendering.",
          "The interactive layout configuration uses update_layout() to programmatically alter background style, hover types, and margins.",
          "Use renderers to output Plotly plots as static PNG/JPEG files using kaleido if offline output is required for standard reports."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following is a key architectural difference between Plotly Express and Matplotlib?",
            "options": [
              "Plotly Express only supports categorical data whereas Matplotlib only supports numerical data.",
              "Plotly Express generates interactive plots using HTML/JS rendering, while Matplotlib produces static canvas/vector output by default.",
              "Plotly plots can only be run inside terminal applications.",
              "Matplotlib can scale to 3D rendering but Plotly Express is strictly constrained to 2D projections."
            ],
            "correctIndex": 1,
            "explanation": "Plotly Express outputs declarative specifications of plots rendered dynamically in web browsers using HTML/D3.js/WebGL frameworks, unlike Matplotlib which outputs static pixel or vector paths natively."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How does Plotly handle rendering performance with very large datasets, and how would you optimize it?",
        "answer": "With massive datasets (e.g., millions of points), SVG-based rendering can lag in the browser because the DOM has to track every point as a node. To optimize this, Plotly uses WebGL-based charting (e.g., using `go.Scattergl` or `px.scatter` with large-data optimized types). WebGL utilizes the user's GPU to paint points on a single canvas, maintaining interactivity for up to millions of points.",
        "difficulty": "Mid",
        "category": "Scenario"
      }
    ]
  },
  {
    "id": "geospatial-folium-maps",
    "slug": "geospatial-folium-maps",
    "title": "Geospatial Visualization and Mapping with Folium",
    "description": "Master geospatial analysis by mapping latitude and longitude coordinates, customizing marker clustering, and constructing interactive choropleths using Folium.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "geospatial",
      "folium",
      "maps",
      "gis"
    ],
    "sections": {
      "what": {
        "text": "Geospatial visualization involves plotting geographical data points on high-fidelity, interactive map overlays. Folium is a powerful Python library that bridges Python's computational structures with Leaflet.js, the leading open-source JavaScript library for mobile-friendly interactive maps. Folium allows you to render map canvases, add geographic layers (such as satellite, terrain, or custom tile layouts), and place interactive markers.\n\nTwo critical spatial techniques are point mapping (often optimized with Marker Clustering to prevent performance drag and visual clutter) and Choropleth mapping. A Choropleth map uses shaded or colored polygons (boundaries defined via GeoJSON layers) to represent aggregate statistical metrics (e.g., median income by zip code, population density by state). Understanding how to bind tabular data columns to structured geo-features is fundamental for building analytical maps.",
        "eli5": "It's like building your own custom Google Map. You can set the coordinates for the starting point, add colored pins, group pins together so they don't block the screen when you zoom out, and color entire states or neighborhoods based on statistical numbers like average weather temperature.",
        "points": [
          "Bridges Python and Leaflet.js for beautiful browser-based interactive mapping.",
          "Utilizes MarkerCluster groups to summarize dense coordinate clusters cleanly.",
          "Supports GeoJSON data binding for geographic boundary coloring (Choropleth maps).",
          "Allows switching between basemaps like OpenStreetMap, Stamen, and CartoDB."
        ]
      },
      "code": {
        "code": "import folium\nfrom folium.plugins import MarkerCluster\n\n# Create a baseline interactive map centered on San Francisco\nm = folium.Map(location=[37.7749, -122.4194], zoom_start=12, tiles='CartoDB positron')\n\n# Define mock point locations (Lat, Lon, Label)\nlocations = [\n    [37.7749, -122.4194, 'Location A'],\n    [37.7800, -122.4200, 'Location B'],\n    [37.7710, -122.4100, 'Location C']\n]\n\n# Instantiate a cluster manager to optimize high-density overlays\nmarker_cluster = MarkerCluster().add_to(m)\n\n# Add markers directly to cluster group\nfor lat, lon, label in locations:\n    folium.Marker(\n        location=[lat, lon],\n        popup=folium.Popup(f'<b>{label}</b>', max_width=200),\n        tooltip='Click for details'\n    ).add_to(marker_cluster)\n\n# Save spatial object locally as a web-viewable HTML container\n# m.save('san_francisco_map.html')",
        "breakdown": [
          {
            "line": "m = folium.Map(location=[37.7749, -122.4194], zoom_start=12, tiles='CartoDB positron')",
            "explanation": "Initializes a map canvas centered on SF, sets default zoom depth, and utilizes a clean, minimal light-colored CartoDB backdrop tile style."
          },
          {
            "line": "marker_cluster = MarkerCluster().add_to(m)",
            "explanation": "Creates a marker clustering dynamic container, which groups nearby coordinate markers together on the UI when zoomed out."
          },
          {
            "line": "folium.Marker(...).add_to(marker_cluster)",
            "explanation": "Creates a single physical pin featuring text tooltips and multi-line popups, appending it directly to our optimized cluster cluster."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Folium outputs are raw HTML pages embedded with Leaflet JS script elements.",
          "A common cause of mapping errors is mismatched coordinate order. Folium always expects coordinate lists formatted strictly as [Latitude, Longitude].",
          "For Choropleth maps, ensure that your tabular data IDs match the exact GeoJSON 'key_on' property path string."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "When designing a Choropleth map in Folium, why is the 'key_on' parameter critical?",
            "options": [
              "It dictates the color scale limit values.",
              "It specifies the coordinate reference system (CRS).",
              "It tells Folium how to match rows in your statistical DataFrame with specific polygon boundaries in the GeoJSON object.",
              "It acts as a private key to access external map tile servers."
            ],
            "correctIndex": 2,
            "explanation": "The 'key_on' parameter maps internal GeoJSON properties (like feature.properties.name) to the key column of the input Pandas DataFrame, allowing the correct data metrics to color the appropriate geographical boundaries."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What is the difference between Vector tiles and Raster tiles in geospatial maps, and which does Folium natively display?",
        "answer": "Raster tiles consist of flat, pre-rendered 256x256 pixel image squares sent to the client. Vector tiles contain the literal geometry paths (points, lines, polygons) rendered dynamically by the browser engine. Folium natively displays tile layers as raster layers (images from providers like OpenStreetMap) but renders custom user overlays, markers, and GeoJSON shapes as interactive vector assets using Leaflet's vector rendering engine.",
        "difficulty": "Mid",
        "category": "Scenario"
      }
    ]
  },
  {
    "id": "matplotlib-gridspec-layouts",
    "slug": "matplotlib-gridspec-layouts",
    "title": "Advanced Subplot Layouts with Matplotlib GridSpec",
    "description": "Break free from standard grids and construct complex, asymmetric dashboard layouts using Matplotlib's GridSpec engine.",
    "difficulty": "Advanced",
    "estimatedMinutes": 50,
    "tags": [
      "matplotlib",
      "gridspec",
      "layouts",
      "advanced-viz"
    ],
    "sections": {
      "what": {
        "text": "Standard matplotlib layouts (`plt.subplots(rows, cols)`) restrict visualization designs to uniform grids where every cell is identical in width and height. For advanced analytical views—such as a central scatter plot flanked by small marginal distribution histograms on its top and right side—you need custom grid geometries.\n\nMatplotlib's `GridSpec` module provides programmatic control over complex layout designs. Operating similar to CSS Grid or nested table frames, GridSpec lets you build a global spatial template and assign single subplots across spanning column or row blocks. Using slice notations (`grid[0:2, 1]`), developers can assign unique aspect ratios, margins, and customized whitespace configurations, turning Matplotlib into a powerful, bespoke layout engine.",
        "eli5": "Imagine cutting a cake. Standard subplots cut it into identical equal square slices. GridSpec lets you slice it like an advanced puzzle: one massive centerpiece block for your main plot, plus a tiny thin ribbon on top, and a narrow pillar on the right edge to show supporting charts.",
        "points": [
          "Enables arbitrary row/column span configurations on a Matplotlib figure canvas.",
          "Crucial for generating specialized visual patterns like Joint Plots (marginal histograms).",
          "Permits precision spacing controls, removing overlap bugs with close-fitting subplots.",
          "Supports asymmetric sizing ratios using width_ratios and height_ratios parameters."
        ]
      },
      "code": {
        "code": "import matplotlib.pyplot as plt\nimport matplotlib.gridspec as gridspec\nimport numpy as np\n\n# Generate mock sample distributions\nnp.random.seed(42)\nx = np.random.randn(500)\ny = 2 * x + np.random.randn(500)\n\n# Initialize figure canvas\nfig = plt.figure(figsize=(10, 8))\n\n# Configure GridSpec matrix (4 rows by 4 columns)\ngs = gridspec.GridSpec(4, 4, wspace=0.3, hspace=0.3)\n\n# Define main joint plot spanning rows 1-3 & columns 0-2\nax_main = fig.add_subplot(gs[1:4, 0:3])\nax_main.scatter(x, y, alpha=0.6, color='purple')\nax_main.set_xlabel('Independent Variable X')\nax_main.set_ylabel('Dependent Variable Y')\n\n# Define top marginal histogram (row 0, spanning columns 0-2, sharing X-axis)\nax_top = fig.add_subplot(gs[0, 0:3], sharex=ax_main)\nax_top.hist(x, bins=30, color='darkblue', alpha=0.7)\nax_top.axis('off') # Remove background grid / axis labels for clean design\n\n# Define right marginal histogram (rows 1-3, column 3, sharing Y-axis)\nax_right = fig.add_subplot(gs[1:4, 3], sharey=ax_main)\nax_right.hist(y, bins=30, orientation='horizontal', color='darkorange', alpha=0.7)\nax_right.axis('off')\n\n# Show finalized customized layout\n# plt.show()",
        "breakdown": [
          {
            "line": "gs = gridspec.GridSpec(4, 4, wspace=0.3, hspace=0.3)",
            "explanation": "Declares a virtual grid layout of 4 rows and 4 columns, allocating distinct spacing gaps vertically (hspace) and horizontally (wspace)."
          },
          {
            "line": "ax_main = fig.add_subplot(gs[1:4, 0:3])",
            "explanation": "Places a subplot inside the defined gridspec. Slice indices specify it spans from row index 1 to 3, and column index 0 to 2."
          },
          {
            "line": "ax_top = fig.add_subplot(gs[0, 0:3], sharex=ax_main)",
            "explanation": "Applies a subplot to the top row. Connecting with 'sharex' links physical zoom and scale interactions between both charts."
          },
          {
            "line": "ax_right.hist(..., orientation='horizontal', ...)",
            "explanation": "Renders a horizontal histogram to cleanly display the marginal distribution of the Y variable along the vertical axis."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Using GridSpec overrides tight_layout(). Use fig.align_labels() or configure custom spacing constraints in the GridSpec constructor.",
          "sharex and sharey arguments ensure axes remain mathematically synchronized across disjoint subplots during manual scaling.",
          "Subplot slicing syntax uses typical python slice indexing which is zero-indexed and exclusive of the end index."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "What is the primary benefit of using GridSpec over standard plt.subplots()?",
            "options": [
              "GridSpec automatically cleans and preprocesses non-numeric NaN inputs in DataFrames.",
              "GridSpec renders plots inside the web browser using interactive JavaScript rather than native Matplotlib backend pathways.",
              "GridSpec supports asymmetric layouts, allowing subplots to span multiple rows or columns with varying width and height ratios.",
              "GridSpec is the only Matplotlib module capable of saving files as dynamic PDFs."
            ],
            "correctIndex": 2,
            "explanation": "GridSpec allows non-uniform subplot configurations. This means individual visualizations can span multiple rows or columns, and can use custom size ratios, which is impossible with standard plt.subplots()."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How do you align labels in Matplotlib when you have complex subplots of varying sizes that cause overlaps?",
        "answer": "When subplots have different sizes or scale magnitudes, axis labels often overlap with adjacent plots. Rather than manual adjustments, you can use `fig.align_labels()` (or `fig.align_xlabels()` / `fig.align_ylabels()`). This function analyzes the bounding box positions of labels on overlapping axes and aligns them along a shared line, maintaining clean visual alignments dynamically.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "altair-declarative-viz",
    "slug": "altair-declarative-viz",
    "title": "Declarative Visualization with Altair",
    "description": "Understand the concepts of declarative visualization and the 'Grammar of Graphics' using the clean, schema-driven syntax of Altair.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 40,
    "tags": [
      "altair",
      "declarative-viz",
      "grammar-of-graphics",
      "vega-lite"
    ],
    "sections": {
      "what": {
        "text": "Altair is a declarative visualization library for Python, based on the Vega and Vega-Lite visualization grammars. Most standard libraries utilize an imperative paradigm where you write step-by-step code detailing how to draw a chart (e.g., 'draw a circle at coordinate x, add a line, change color to blue'). Declarative visualization instead shifts focus to mapping data properties to visual channels.\n\nIn Altair, you define your chart by declaring relationships: 'Map column A to the X-axis, column B to the Y-axis, and represent rows as circles.' Altair parses this structural blueprint into highly optimized JSON specifications that render seamlessly in web environments. Its strict type system categorization—Quantative (:Q), Nominal (:N), Ordinal (:O), and Temporal (:T)—ensures standard graphical behaviors such as appropriate scale selection, labeling, and interactive legend handling occur automatically.",
        "eli5": "Instead of telling Python: 'Step 1: Draw a circle. Step 2: Color it blue. Step 3: Put it at coordinate (x,y)', Altair uses a declarative approach. You just tell the computer: 'Connect the Country column to colors, and the Income column to height.' The computer works out all the drawing details for you automatically.",
        "points": [
          "Employs a declarative syntax based on the academic 'Grammar of Graphics'.",
          "Translates clean Python code patterns into robust, standards-compliant Vega-Lite JSON specs.",
          "Requires explicit data data types (:Q, :O, :N, :T) to automatically optimize layout components.",
          "Enables easy chart concatenation (combining figures horizontally or vertically with operations like '|' and '&')."
        ]
      },
      "code": {
        "code": "import altair as alt\nimport pandas as pd\n\n# Construct sample dataset containing structured observation columns\ndata = pd.DataFrame({\n    'Model': ['Model A', 'Model B', 'Model C', 'Model D', 'Model E'],\n    'Accuracy': [0.82, 0.91, 0.74, 0.88, 0.95],\n    'ParameterCount': [120, 450, 80, 250, 600],\n    'Architecture': ['CNN', 'Transformer', 'RNN', 'CNN', 'Transformer']\n})\n\n# Declare chart mapping via graphical pipelines\nchart = alt.Chart(data).mark_circle(size=150).encode(\n    x=alt.X('ParameterCount:Q', title='Model Parameter Count (Millions)'),\n    y=alt.Y('Accuracy:Q', scale=alt.Scale(domain=[0.7, 1.0]), title='Evaluation Accuracy'),\n    color=alt.Color('Architecture:N', title='Model Family'),\n    tooltip=['Model', 'Accuracy', 'ParameterCount']\n).properties(\n    width=500,\n    height=300,\n    title='Model Efficiency Comparison'\n).interactive()\n\n# Save or display specification output\n# chart.save('declarative_chart.html')",
        "breakdown": [
          {
            "line": "chart = alt.Chart(data).mark_circle(size=150)",
            "explanation": "Instantiates the Altair chart using a declarative mark layer, specifying we want to represent rows using circular markers."
          },
          {
            "line": "x=alt.X('ParameterCount:Q', ...)",
            "explanation": "Maps parameter counts to the X-axis. ':Q' tells Altair that this is quantitative (numerical, continuous) data."
          },
          {
            "line": "color=alt.Color('Architecture:N', ...)",
            "explanation": "Maps categorical styles to discrete colors. ':N' indicates nominal data (unordered categorical classes)."
          },
          {
            "line": "scale=alt.Scale(domain=[0.7, 1.0])",
            "explanation": "Explicitly adjusts scale parameters to set boundaries for the axis values."
          },
          {
            "line": ".interactive()",
            "explanation": "Adds standard interactions like click-and-drag panning and scroll-wheel zooming to the chart with a single function call."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Data type suffixes are critical in Altair: :Q (Quantitative), :O (Ordinal), :N (Nominal), and :T (Temporal).",
          "Altair charts are entirely defined by JSON-based schemas. You can view this specification structure using `chart.to_json()`.",
          "To display multi-chart grids, use composition operators: `chart1 | chart2` for side-by-side plots, and `chart1 & chart2` for vertical stacks."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "What is the primary role of the ':O' notation when declaring a field mapping in Altair?",
            "options": [
              "It specifies that the data represents an 'Outline' geometry boundary.",
              "It indicates that the data values represent ordered categorical factors (Ordinal).",
              "It forces Altair to execute an outer-join operations over complex remote databases.",
              "It acts as an optimization override to disable interactive features."
            ],
            "correctIndex": 1,
            "explanation": "The ':O' data type suffix tells Altair that the column contains Ordinal data (categorical values that have an inherent order, like rankings or satisfaction levels), which ensures the visual scales maintain order sequence."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between Imperative and Declarative visualization frameworks.",
        "answer": "Imperative frameworks (like Matplotlib) require you to write procedural commands step-by-step to construct a graphic (e.g., set grid ticks, paint a line, adjust spacing). Declarative frameworks (like Altair or ggplot) focus on mapping data columns to visual properties (such as color, position, and shape). The framework's compiler handles rendering details based on rules from the Grammar of Graphics, resulting in faster development and more readable code.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "high-dimensional-projections",
    "slug": "high-dimensional-projections",
    "title": "Visualizing High-Dimensional Data with PCA and t-SNE",
    "description": "Learn visual projection practices for plotting complex datasets with dozens of attributes down to 2D or 3D coordinate planes.",
    "difficulty": "Advanced",
    "estimatedMinutes": 60,
    "tags": [
      "high-dimensional",
      "pca",
      "t-sne",
      "dimensionality-reduction"
    ],
    "sections": {
      "what": {
        "text": "Modern tabular datasets frequently suffer from the 'curse of dimensionality,' where records feature dozens or hundreds of distinct analytical dimensions. Because human eyes can only read 2D or 3D visual environments, displaying high-dimensional features requires dimensionality reduction techniques.\n\nThere are two main paradigms for visualization projection: linear and non-linear. Principal Component Analysis (PCA) is a linear approach that rotates features along the orthogonal directions of maximum variance. It preserves global structures and scale distances, but often fails to separate complex clusters that have non-linear boundaries. In contrast, t-Distributed Stochastic Neighbor Embedding (t-SNE) is a non-linear approach that models probabilistic neighborhoods to preserve local cluster structures. Mastering the visual interpretation of these projections, including hyperparameter tuning (such as perplexity settings in t-SNE), is essential for identifying hidden structures and outliers in high-dimensional data.",
        "eli5": "Imagine trying to squash a 3D globe flat onto a single sheet of paper. You have to stretch and squeeze things, and you'll always lose some information. Now imagine trying to do that with a shape that has 100 different dimensions! PCA and t-SNE are smart math tools that squash those complex multi-dimensional shapes down to flat 2D scatter plots so we can visually spot clusters and patterns.",
        "points": [
          "Reduces multi-dimensional features to lower-dimensional 2D or 3D coordinate spaces.",
          "PCA works well for preserving global structure and identifying major directional variance.",
          "t-SNE models local similarity neighborhoods, highlighting fine-grained clusters.",
          "t-SNE projections are sensitive to the perplexity parameter, which balances local and global focus."
        ]
      },
      "code": {
        "code": "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nfrom sklearn.decomposition import PCA\nfrom sklearn.manifold import TSNE\n\n# Set seed for reproducibility\nnp.random.seed(42)\n\n# Generate simulated high-dimensional data (500 samples, 20 columns/dimensions)\n# Data contains three distinct latent clusters\ncluster_labels = np.random.choice([0, 1, 2], size=500)\ndata_list = []\nfor label in cluster_labels:\n    base = np.zeros(20) + label * 3.5\n    noise = np.random.randn(20) * 1.2\n    data_list.append(base + noise)\n\nX = np.array(data_list)\n\n# 1. Apply Linear Projection: Principal Component Analysis (PCA)\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X)\n\n# 2. Apply Non-Linear Projection: t-SNE\ntsne = TSNE(n_components=2, perplexity=30.0, random_state=42, n_iter=1000)\nX_tsne = tsne.fit_transform(X)\n\n# Visualizing PCA vs t-SNE results side-by-side\nfig, axes = plt.subplots(1, 2, figsize=(14, 6))\n\n# Plot PCA results\nscatter_pca = axes[0].scatter(X_pca[:, 0], X_pca[:, 1], c=cluster_labels, cmap='viridis', alpha=0.7)\naxes[0].set_title('PCA Linear Projection')\naxes[0].set_xlabel('Principal Component 1')\naxes[0].set_ylabel('Principal Component 2')\nfig.colorbar(scatter_pca, ax=axes[0], label='Original Cluster Label')\n\n# Plot t-SNE results\nscatter_tsne = axes[1].scatter(X_tsne[:, 0], X_tsne[:, 1], c=cluster_labels, cmap='viridis', alpha=0.7)\naxes[1].set_title('t-SNE Non-Linear Projection')\naxes[1].set_xlabel('t-SNE Dimension 1')\naxes[1].set_ylabel('t-SNE Dimension 2')\nfig.colorbar(scatter_tsne, ax=axes[1], label='Original Cluster Label')\n\n# plt.show()",
        "breakdown": [
          {
            "line": "X_pca = pca.fit_transform(X)",
            "explanation": "Fits the linear PCA model to the 20-dimensional dataset and projects it onto the 2 directions of highest variance."
          },
          {
            "line": "tsne = TSNE(n_components=2, perplexity=30.0, ...)",
            "explanation": "Initializes the t-SNE model. Perplexity determines how to balance local and global features (often set between 5 and 50)."
          },
          {
            "line": "X_tsne = tsne.fit_transform(X)",
            "explanation": "Runs the iterative optimization process to project the high-dimensional points into a 2D space while preserving local neighborhoods."
          },
          {
            "line": "axes[0].scatter(X_pca[:, 0], X_pca[:, 1], c=cluster_labels, ...)",
            "explanation": "Plots the final coordinate coordinates on separate axes, coloring points by their true labels to evaluate clustering quality."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "PCA preserves global distance relationships, but can't map non-linear manifold structures well.",
          "t-SNE is a stochastic (probabilistic) algorithm. You must set a random seed to get reproducible plots across different runs.",
          "Because t-SNE doesn't preserve global distances or density levels well, physical distances between separate clusters in the plot are often not meaningful."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Why is it generally discouraged to compare the absolute physical distance between two separate clusters in a t-SNE projection?",
            "options": [
              "t-SNE is a linear mapping tool, so distances are automatically zeroed out.",
              "t-SNE is designed to preserve local structure rather than global distances, which means the spatial distance between far-apart clusters can change arbitrarily during optimization.",
              "t-SNE scales coordinate systems to logarithmic values, which distorts visual measurements.",
              "The physical layout is determined entirely by color mappings rather than spatial coordinate variables."
            ],
            "correctIndex": 1,
            "explanation": "Because t-SNE optimizes for local similarity neighborhoods (keeping close points together), it does not guarantee global distance relationships. Therefore, the distance between two distant clusters in a t-SNE plot is mostly arbitrary and should not be used for quantitative analysis."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How does changing the perplexity parameter impact a t-SNE visualization, and what can go wrong if it is set too low or too high?",
        "answer": "Perplexity balances local and global structures by determining how many neighbors each point considers when mapping distances. If perplexity is set too low (e.g., 2), the algorithm only focuses on immediate neighbors, which splits real clusters into many tiny, artificial groups. If perplexity is set too high (e.g., larger than the sample size), every point considers the entire dataset as its neighborhood, merging distinct clusters and washing out any interesting local patterns.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "network-graph-visualization-networkx",
    "slug": "network-graph-visualization-networkx",
    "title": "Relational Network and Graph Visualization with NetworkX",
    "description": "Master the art of representing interconnected data, mapping structural metrics to visual channels, and managing graph layouts to prevent the hairball effect.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 35,
    "tags": [
      "networkx",
      "graph-theory",
      "matplotlib",
      "data-visualization"
    ],
    "sections": {
      "what": {
        "text": "In data science, many datasets are best represented not as tabular rows, but as networks of entities and relationships, such as social connections, transaction routes, or infrastructure pipelines. Relational network visualization focuses on translating these abstract mathematical graphs (comprising nodes and edges) into structured, legible visual layouts. The core challenge of graph visualization is representing spatial arrangements that do not naturally have coordinates; unlike a map or a scatter plot, we must calculate where nodes sit to maximize readability.\n\nTo solve this, layout algorithms like the Fruchterman-Reingold (Spring) layout treat the network as a physical system where nodes act as repelling particles and edges act as attractive springs, naturally pulling closely-related clusters together and pushing distinct groups apart. Furthermore, simple network rendering often results in an unreadable 'hairball' of overlapping lines. To prevent this, professional visualizations map structural metrics—such as degree centrality (the number of connections a node has) to node size, or relationship strength to edge thickness and color opacity. This visual encoding immediately transforms a chaotic layout into an intuitive heat map of structural influence and connection intensity.",
        "eli5": "Imagine a party where you want to draw a map of who knows whom. If you draw everyone randomly, you will end up with a messy ball of overlapping lines. Instead, you put close friends near each other, and draw people who don't know many others on the outer edges. To make the popular hosts stand out, you draw their dots bigger, and you make the lines thicker for best friends. NetworkX and spring layout algorithms do exactly this: they use physics-like rules to organize complex relationships so you can see the social groups and VIPs at a single glance.",
        "points": [
          "Nodes represent entities (vertices) and edges represent relationships (links), which can be directed or undirected, weighted or unweighted.",
          "Layout algorithms (like Spring, Circular, or Shell layouts) calculate custom 2D coordinates for nodes to minimize edge crossings and reveal structural patterns.",
          "To avoid the illegible 'hairball' effect, structural graph metrics (e.g., Degree Centrality, Betweenness) should be mapped directly to visual dimensions like node size, color, and line weight."
        ]
      },
      "code": {
        "code": "import matplotlib.pyplot as plt\nimport networkx as nx\n\n# 1. Initialize an undirected graph and add weighted edges\nG = nx.Graph()\ncollaborations = [\n    (\"Alice\", \"Bob\", 5), (\"Alice\", \"Charlie\", 2), (\"Bob\", \"Charlie\", 1),\n    (\"Charlie\", \"David\", 6), (\"David\", \"Eve\", 3), (\"Eve\", \"Frank\", 4),\n    (\"Frank\", \"David\", 2), (\"Grace\", \"Alice\", 4), (\"Grace\", \"Bob\", 2)\n]\nG.add_weighted_edges_from(collaborations)\n\n# 2. Compute structural metrics to map to visual properties\ndegrees = dict(G.degree())\nnode_sizes = [v * 300 for v in degrees.values()]  # Scale node size by degree\n\n# Map edge weights to a list for line thicknesses\nedge_widths = [d['weight'] for u, v, d in G.edges(data=True)]\n\n# 3. Calculate node positions using a force-directed layout\n# 'k' controls the optimal distance between nodes, 'seed' ensures reproducibility\npos = nx.spring_layout(G, k=1.2, seed=42)\n\n# 4. Draw graph elements step-by-step for custom styling\nplt.figure(figsize=(10, 8))\n\n# Draw nodes with a colormap mapping to node degree\nnode_colors = list(degrees.values())\nscatter = nx.draw_networkx_nodes(\n    G, pos, \n    node_size=node_sizes, \n    node_color=node_colors, \n    cmap=plt.cm.plasma, \n    alpha=0.9\n)\n\n# Draw edges with variable width\nnx.draw_networkx_edges(\n    G, pos, \n    width=edge_widths, \n    edge_color=\"gray\", \n    alpha=0.6\n)\n\n# Draw labels slightly offset or directly on nodes\nnx.draw_networkx_labels(\n    G, pos, \n    font_size=10, \n    font_weight=\"bold\", \n    font_family=\"sans-serif\"\n)\n\n# Add visual aids\nplt.title(\"Collaboration Network: Degree Centrality & Connection Strength\", fontsize=14, fontweight='bold')\nplt.colorbar(scatter, label=\"Node Degree (Connections)\", shrink=0.7)\nplt.axis(\"off\")  # Hide geometric axes as coordinates are relative\nplt.tight_layout()\nplt.show()",
        "breakdown": [
          {
            "line": "G = nx.Graph()",
            "explanation": "Creates a blank undirected graph container using NetworkX."
          },
          {
            "line": "G.add_weighted_edges_from(collaborations)",
            "explanation": "Populates the graph with nodes and weighted edges representing the strength of relationships."
          },
          {
            "line": "degrees = dict(G.degree())",
            "explanation": "Calculates the number of connections for each node, which will serve as our visual metric."
          },
          {
            "line": "pos = nx.spring_layout(G, k=1.2, seed=42)",
            "explanation": "Runs the Fruchterman-Reingold force-directed algorithm to calculate aesthetic x, y positions for each node."
          },
          {
            "line": "nx.draw_networkx_nodes(..., node_color=node_colors, cmap=plt.cm.plasma)",
            "explanation": "Draws nodes with sizes scaled to their degrees and colors mapped to the plasma color scale."
          },
          {
            "line": "nx.draw_networkx_edges(..., width=edge_widths)",
            "explanation": "Draws connections with dynamic stroke widths based directly on their edge weights."
          },
          {
            "line": "plt.axis(\"off\")",
            "explanation": "Removes the x and y axes because physical positioning coordinates are relative and serve layout readability rather than absolute spatial units."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "NetworkX's drawing functionality relies on Matplotlib as its rendering backend.",
          "Spring layout algorithms use a random initial state; always set the 'seed' parameter for reproducible plot layouts across runs.",
          "For massive networks (thousands of nodes), native NetworkX/Matplotlib rendering becomes highly inefficient. High-density graphs require alternative engines like Gephi, Cytoscape, or pyvis.",
          "Always disable axis visibility (plt.axis('off')) for standard network graph plots to avoid confusing viewers with meaningless x/y spatial scales."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which visual issue is characterized by an unreadable mass of overlapping nodes and crossing edges in network plotting?",
            "options": [
              "The overplotting effect",
              "The hairball effect",
              "The geometric convergence error",
              "Force-directed saturation"
            ],
            "correctIndex": 1,
            "explanation": "The 'hairball effect' occurs when a dense network graph is visualized without layout adjustments, filtering, or metric mappings, leaving it unreadable."
          },
          {
            "question": "Why is it important to set a random seed when calling networkx.spring_layout()?",
            "options": [
              "To keep edge weights constant",
              "To ensure the nodes are distributed in a perfect geometric circle",
              "Because force-directed layout algorithms initialize node positions randomly, and a seed guarantees layout reproducibility",
              "To decrease the computational complexity of the layout algorithm"
            ],
            "correctIndex": 2,
            "explanation": "Spring layout algorithms use a random starting layout and physical physics simulation. Setting a seed ensures the layout calculation outputs identical coordinate results every time the script is executed."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How would you handle visualizing a highly dense graph containing over 10,000 nodes and 50,000 edges?",
        "answer": "To visualize a massive network without creating an illegible hairball: 1. Apply structural filtering: filter out weak connections by setting a minimum edge weight threshold, or keep only the giant connected component. 2. Aggregate the graph: cluster nodes into communities (using algorithms like Louvain modularity) and visualize the communities as meta-nodes. 3. Use interactive rendering engines: export the network to libraries like PyVis, Cytoscape, or WebGL-based viewers that support zooming, panning, and dynamic node-highlighting on hover. 4. Visual encoding: map alpha transparency to edges so the background doesn't get saturated with dark lines, or use edge bundling to group parallel paths.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  }
];
