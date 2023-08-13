'use client';

import { Article } from '@shared/typings';

import DemoArticle from './Article';

const content: Article = {
  title: 'The Rise of AI: Implications for the Future',
  subtitle:
    'Exploring the advancements and challenges of artificial intelligence.',
  author: {
    name: 'Jane Doe',
    avatar: 'https://placekitten.com/50/50',
  },
  publicationDate: 'August 13, 2023',
  coverImage: 'https://placekitten.com/1200/600',
  content: [
    {
      type: 'paragraph',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
    },
    {
      type: 'paragraph',
      text: 'Donec sit amet quam scelerisque, blandit est sed, congue odio. Praesent sollicitudin, ex at convallis tincidunt, dolor orci luctus lorem, vel consequat magna mauris sit amet purus.Donec sit amet quam scelerisque, blandit est sed, congue odio. Praesent sollicitudin, ex at convallis tincidunt, dolor orci luctus lorem, vel consequat magna mauris sit amet purus.Donec sit amet quam scelerisque, blandit est sed, congue odio. Praesent sollicitudin, ex at convallis tincidunt, dolor orci luctus lorem, vel consequat magna mauris sit amet purus.Donec sit amet quam scelerisque, blandit est sed, congue odio. Praesent sollicitudin, ex at convallis tincidunt, dolor orci luctus lorem, vel consequat magna mauris sit amet purus.',
    },
    {
      type: 'image',
      url: 'https://placekitten.com/800/400',
      caption: 'An AI-powered cat.',
    },
    {
      type: 'paragraph',
      text: 'Mauris in turpis in lorem pellentesque facilisis at at enim. Duis nec vestibulum magna. Sed sed purus sem.Mauris in turpis in lorem pellentesque facilisis at at enim. Duis nec vestibulum magna. Sed sed purus sem.Mauris in turpis in lorem pellentesque facilisis at at enim. Duis nec vestibulum magna. Sed sed purus sem.Mauris in turpis in lorem pellentesque facilisis at at enim. Duis nec vestibulum magna. Sed sed purus sem.Mauris in turpis in lorem pellentesque facilisis at at enim. Duis nec vestibulum magna. Sed sed purus sem.',
    },
  ],
};

export default function Page() {
  return (
    <div className="py-20">
      <DemoArticle article={content} />
    </div>
  );
}
