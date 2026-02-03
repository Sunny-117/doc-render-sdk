# Documentation Rendering SDK

## Proof of Concept
>
> This is a proof-of-concept project.
>
> Features are incomplete, and API and output behavior may change between 0.x versions.
>
> Feedback and contributions are very welcome! If you'd like to make changes with more than a few lines of code, please open an issue first to discuss.

A specialized SDK for rendering component documentation sites

## Features

> 💡 The following features are for prototype validation; some may be incomplete or have issues

- 🎨 **Themeable Design** - Support for custom themes and styles
- 📱 **Responsive Layout** - Adapts to various screen sizes
- 🔧 **Component Architecture** - Highly reusable documentation components
- � **Demo Showcase** - Support for code preview, live execution, and code folding
- ✏️ **Code Editing** - Support for online code editing with live preview (experimental feature)
- � **Syntax Highlighting** - Prism.js-based code highlighting
- � **API Documentation** - Structured API parameter documentation
- � **Hot Reload** - Support for hot reload during development
- 🎯 **Plugin System** - Support for custom plugin extensions
- � **Zero Config** - Works out of the box, with deep customization support

## ⚠️ Known Limitations

- Code editing feature relies on CDN loading of Monaco Editor and Babel, which may fail to load
- Live compilation only supports simple JSX components; complex components may fail to compile
- Not tested at scale; may have performance issues and edge cases
- Some features are still in development; APIs may change at any time

## 🚀 Quick Start

### 1. CLI Tool

```bash
# Create new project
npx doc-render-sdk create my-docs

# Start development server
npx doc-render-sdk dev

# Build project
npx doc-render-sdk build

# Migrate old project
npx doc-render-sdk migrate --source ./doc --target ./docs-new
```

### 2. Installation

```bash
npm install doc-render-sdk
```

```javascript
import DocSDK from 'doc-render-sdk';

const docSdk = new DocSDK({
  title: 'My Component Library',
  components: {
    'button': {
      label: 'Button',
      demos: [
        {
          title: 'Basic Usage',
          desc: 'The simplest usage',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Button',
          apiKey: 'Button'
        }
      ]
    }
  }
});

docSdk.render('#app');
```

## 🔧 Vite Plugin

doc-render-sdk provides a Vite plugin that automatically reads demo file source code and injects it into global variables.

### Core Features

- ✅ **Auto Read Source** - Automatically read source code from demo files
- ✅ **Zero Maintenance** - No need to manually maintain code strings
- ✅ **Single Source of Truth** - Demo files are the only source of code
- ✅ **Auto Sync** - Modify demo files, code display updates automatically
- ✅ **Flexible Config** - Support for custom configuration and presets

### Quick Usage

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import demoCodePlugin from 'doc-render-sdk/plugin';

export default defineConfig({
  plugins: [
    demoCodePlugin({
      include: 'src/main.js',
      demoPattern: '/demo/',
      debug: true
    })
  ]
});
```

### Preset Configurations

```javascript
import demoCodePlugin, { presets } from 'doc-render-sdk/plugin';

// Default config
demoCodePlugin(presets.default)

// Strict mode
demoCodePlugin(presets.strict)

// Loose mode (supports underscore naming)
demoCodePlugin(presets.loose)

// TypeScript project
demoCodePlugin(presets.typescript)
```

For detailed documentation, see [Plugin Documentation](./src/plugin/README.md)

---

## 📚 Playground Documentation

- [Project Overview](./playground/README.md) - Playground project overview
- [Component Addition Guide](./playground/HOW_TO_ADD_COMPONENT.md) - How to add new components
- [Project Summary](./playground/SUMMARY.md) - Complete project summary

### Automation Tools

- [Vite Plugin Documentation](./playground/VITE_PLUGIN_README.md) - vite-plugin-demo-code detailed documentation
- [Code Auto Generation](./playground/DEMO_CODE_AUTO_GENERATION.md) - Demo code auto-generation principles
- [Important Changes](./playground/CHANGES.md) - Latest changes

## 🔧 Vite Plugin: vite-plugin-demo-code

A Vite plugin designed specifically for doc-render-sdk that automatically reads demo file source code and injects it into global variables.

### Core Features

- ✅ **Auto Read Source** - Automatically read source code from demo files
- ✅ **Zero Maintenance** - No need to manually maintain code strings
- ✅ **Single Source of Truth** - Demo files are the only source of code
- ✅ **Auto Sync** - Modify demo files, code display updates automatically
- ✅ **Flexible Config** - Support for custom configuration and presets

### Quick Usage

```javascript
// vite.config.js
import demoCodePlugin from './vite-plugin-demo-code.js';

export default defineConfig({
  plugins: [
    demoCodePlugin()  // Use default config
  ]
});
```

### Custom Configuration

```javascript
demoCodePlugin({
  include: 'src/main.js',           // Files to process
  demoPattern: '/components/',      // Demo file path pattern
  globalVar: 'window.__MY_CODES__', // Custom global variable name
  debug: true,                      // Enable debug mode
  transform: (code) => {            // Custom code transformation
    return code.replace(/\/\/.*/g, '');
  }
})
```

### Preset Configurations

```javascript
import demoCodePlugin, { presets } from './vite-plugin-demo-code.js';

// Default config
demoCodePlugin(presets.default)

// Strict mode
demoCodePlugin(presets.strict)

// Loose mode (supports underscore naming)
demoCodePlugin(presets.loose)

// TypeScript project
demoCodePlugin(presets.typescript)
```

For detailed documentation, see [Vite Plugin Documentation](./playground/VITE_PLUGIN_README.md)

---

## 📚 Configuration Documentation

### Configuration Options

```javascript
const config = {
  // Basic information
  title: 'Documentation',
  description: 'Component Documentation Site',
  version: '1.0.0',

  // Theme configuration
  theme: {
    name: 'default',
    colors: {
      primary: '#1890ff'
    }
  },

  // Layout configuration
  layout: {
    type: 'sidebar', // sidebar, top, mixed
    sidebar: {
      width: 280,
      collapsible: true
    }
  },

  // Component configuration
  components: {
    'component-name': {
      label: 'Component Name',
      description: 'Component description',
      demos: [...],
      apis: [...]
    }
  },
};
```

### Component Registration

```javascript
// Register Demo components
window.__DOC_SDK_DEMOS__ = {
  'component-name': {
    'demo-name': DemoComponent
  }
};

// Register Demo code
window.__DOC_SDK_DEMO_CODES__ = {
  'component-name': {
    'demo-name': 'const Demo = () => <div>Hello</div>;'
  }
};

// Register API documentation
window.__DOC_SDK_APIS__ = {
  'component-name': {
    'api-name': [
      {
        param: 'prop',
        type: 'string',
        desc: 'Property description',
        default: '',
        required: false
      }
    ]
  }
};
```

## 🔧 Advanced Features

### Custom Theme

```javascript
const customTheme = {
  name: 'custom',
  colors: {
    primary: '#ff6b6b',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ff6b6b'
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    demo: `
      .doc-demo {
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    `
  }
};

const docSdk = new DocSDK({
  theme: customTheme
});
```

### Plugin Development

```javascript
const myPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(context) {
    // Add hooks
    context.hooks.add('beforeRender', () => {
      console.log('Before render');
    });

    // Listen to events
    context.events.on('routeChange', (route) => {
      console.log('Route changed:', route);
    });
  }
};

docSdk.use(myPlugin);
```
