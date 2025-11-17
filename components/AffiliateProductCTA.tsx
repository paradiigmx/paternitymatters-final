import React from 'react';

interface AffiliateProductCTAProps {
  productName: string;
  description: string;
  affiliateUrl: string;
  imageUrl?: string;
  price?: string;
}

const AffiliateProductCTA: React.FC<AffiliateProductCTAProps> = ({
  productName,
  description,
  affiliateUrl,
  imageUrl,
  price
}) => {
  return (
    <div className="bg-gradient-to-br from-primary-blue/10 to-primary-orange/10 border border-primary-orange/30 rounded-xl p-6 my-8">
      <div className="flex items-start gap-4">
        {imageUrl && (
          <div className="hidden sm:block flex-shrink-0">
            <img src={imageUrl} alt={productName} className="w-24 h-24 object-cover rounded-lg" />
          </div>
        )}
        <div className="flex-grow">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h4 className="text-lg font-bold text-dark-blue">{productName}</h4>
            {price && <span className="text-xl font-bold text-primary-orange flex-shrink-0">{price}</span>}
          </div>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-orange text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
            >
              View on Amazon →
            </a>
            <p className="text-xs text-gray-500">
              <strong>Affiliate Disclosure:</strong> We earn from qualifying purchases at no extra cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProductCTA;
