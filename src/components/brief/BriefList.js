// components/brief/BriefList.js
import Link from 'next/link';

const BriefList = ({ briefs }) => {
  return (
    <div>
      {briefs.map((brief) => (
        <div key={brief._id}>
          <Link href={`/topics/${brief.briefTopic}/${brief.briefSlug}`}>
            <a>
              <h3>{brief.briefTitle}</h3>
            </a>
          </Link>
          <p>{brief.briefSummary}</p>
        </div>
      ))}
    </div>
  );
};

export default BriefList;
