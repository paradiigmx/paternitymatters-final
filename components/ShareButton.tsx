
import React from 'react';
import { ShareIcon, SimpleTwitterIcon, SimpleFacebookIcon, SimpleLinkedInIcon, EmailIcon } from './icons';

const ShareButton: React.FC<{ title: string; sectionId?: string; urlOverride?: string }> = ({ title, sectionId, urlOverride }) => {
    const url = urlOverride || (sectionId ? `${window.location.href.split('?')[0].split('#')[0]}#${sectionId}` : window.location.href.split('?')[0].split('#')[0]);
    const text = `Check out this article from PaternityMatters.org: ${title}`;

    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const encodedArticleTitle = encodeURIComponent(title);

    const shareOptions = [
      { Icon: SimpleTwitterIcon, label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, color: 'hover:text-sky-500' },
      { Icon: SimpleFacebookIcon, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'hover:text-blue-600' },
      { Icon: SimpleLinkedInIcon, label: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedArticleTitle}&summary=${encodedText}&source=PaternityMatters.org`, color: 'hover:text-blue-800' },
      { Icon: EmailIcon, label: 'Email', href: `mailto:?subject=${encodedText}&body=I thought you might find this interesting:%0D%0A${encodedUrl}`, color: 'hover:text-gray-600' }
    ];

    return (
        <div className="flex items-center gap-2">
            {shareOptions.map(({ Icon, label, href, color }) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${label}`}
                    className={`p-3 rounded-full bg-gray-100 text-gray-700 transition-colors duration-200 ${color}`}
                >
                    <Icon className="w-5 h-5" />
                </a>
            ))}
        </div>
    );
};

export default ShareButton;
