import { NlpTopic } from '@shared/typings';

interface TopicProps {
  topic: NlpTopic;
}

export function Topic({ topic }: TopicProps) {
  return (
    <div className="rounded bg-blue-50 px-1 py-0.5 text-[10px] text-blue-700">
      {topic.text}
    </div>
  );
}
