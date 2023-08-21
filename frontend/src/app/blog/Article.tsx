import { Article } from '@shared/typings';
import React from 'react';

interface ArticleProps {
  article: Article;
  onParagraphMouseUp?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

export default function DemoArticle({
  article,
  onParagraphMouseUp,
}: ArticleProps) {
  return (
    <div className="mx-auto mt-16 max-w-3xl px-4">
      <h1 className="mb-2 text-4xl font-bold">{article.title}</h1>
      <h2 className="mb-4 text-base leading-relaxed text-gray-600">
        {article.subtitle}
      </h2>
      <img className="mb-8 rounded" src={article.coverImage} alt="Cover" />
      {article.content.map((item, index) => {
        if (item.type === 'paragraph') {
          return (
            <p
              onMouseUp={onParagraphMouseUp}
              key={index}
              className="mb-6 text-base leading-7"
            >
              {item.text}
            </p>
          );
        } else if (item.type === 'image') {
          return (
            <div key={index} className="mb-6">
              <img className="rounded" src={item.url} alt="Content" />
              <div className="mt-2 text-center text-sm text-gray-500">
                {item.caption}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
