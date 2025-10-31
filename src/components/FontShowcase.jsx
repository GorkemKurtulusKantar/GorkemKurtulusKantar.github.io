// Font showcase component to test all available fonts
const FontShowcase = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Font Showcase</h1>
      
      {/* Inter Font */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-blue-400">Inter (Default)</h2>
        <p className="font-inter text-lg">
          The quick brown fox jumps over the lazy dog. 
          <span className="font-bold"> Bold text</span> and 
          <span className="font-light"> light text</span>.
        </p>
        <p className="font-inter text-sm text-gray-300">
          Perfect for body text and UI elements. Clean, modern, highly readable.
        </p>
      </div>

      {/* Montserrat Font */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-green-400">Montserrat</h2>
        <p className="font-montserrat text-lg">
          The quick brown fox jumps over the lazy dog.
          <span className="font-bold"> Bold text</span> and 
          <span className="font-light"> light text</span>.
        </p>
        <p className="font-montserrat text-sm text-gray-300">
          Great for headings and titles. Geometric, modern, similar to Avant Garde.
        </p>
      </div>

      {/* Nunito Sans Font */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-purple-400">Nunito Sans</h2>
        <p className="font-nunito text-lg">
          The quick brown fox jumps over the lazy dog.
          <span className="font-bold"> Bold text</span> and 
          <span className="font-light"> light text</span>.
        </p>
        <p className="font-nunito text-sm text-gray-300">
          Friendly, rounded, excellent for UI and content. Very readable.
        </p>
      </div>

      {/* Roboto Flex Font */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-yellow-400">Roboto Flex</h2>
        <p className="font-roboto-flex text-lg">
          The quick brown fox jumps over the lazy dog.
          <span className="font-bold"> Bold text</span> and 
          <span className="font-light"> light text</span>.
        </p>
        <p className="font-roboto-flex text-sm text-gray-300">
          Variable font with flexible weights. Great for dynamic typography.
        </p>
      </div>

      {/* Usage Examples */}
      <div className="border-t border-gray-700 pt-8">
        <h2 className="text-2xl font-montserrat font-bold mb-4">Usage Examples</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-montserrat font-bold text-xl">Headings (Montserrat)</h3>
            <h1 className="font-montserrat font-bold text-4xl">Main Title</h1>
            <h2 className="font-montserrat font-semibold text-2xl">Section Title</h2>
            <h3 className="font-montserrat font-medium text-lg">Subsection</h3>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-inter font-bold text-xl">Body Text (Inter)</h3>
            <p className="font-inter text-base">
              This is regular body text using Inter font. It's highly readable 
              and works great for paragraphs, descriptions, and UI elements.
            </p>
            <p className="font-inter text-sm text-gray-400">
              Smaller text and captions also look great with Inter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontShowcase;
