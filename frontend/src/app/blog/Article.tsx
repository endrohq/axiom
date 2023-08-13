import { Article } from '@shared/typings';
import React from 'react';

interface ArticleProps {
  article: Article;
}

export default function DemoArticle({ article }: ArticleProps) {
  return (
    <div className="mx-auto mt-16 max-w-3xl px-4">
      <h1 className="mb-2 text-4xl font-bold">{article.title}</h1>
      <h2 className="mb-4 text-xl text-gray-600">{article.subtitle}</h2>
      <div className="mb-8 flex items-center">
        <img
          className="mr-4 h-12 w-12 rounded-full"
          src={article.author.avatar}
          alt={article.author.name}
        />
        <div>
          <div className="text-lg font-semibold">{article.author.name}</div>
          <div className="text-sm text-gray-500">{article.publicationDate}</div>
        </div>
      </div>
      <img className="mb-8 rounded" src={article.coverImage} alt="Cover" />
      {article.content.map((item, index) => {
        if (item.type === 'paragraph') {
          return (
            <p key={index} className="mb-6 text-lg">
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
