import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members?: {
    image: string;
  }[];
}

function CommunityLinkCard({
  id,
  name,
  username,
  imgUrl,
  bio,
  members,
}: Props) {
  return (
    <article>
      <div className="flex items-center mt-5">
        <Link
          href={`/communities/${id}`}
          key={id}
          className="flex items-center"
        >
          <Image
            src={imgUrl}
            alt="user avatar"
            width={48}
            height={48}
            className="rounded-full mr-5"
          />
          <div className="flex-1 text-ellipsis">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
        </Link>
      </div>
    </article>
  );
}

export default CommunityLinkCard;
