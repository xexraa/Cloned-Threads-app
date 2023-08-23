"use server";

import { fetchCommunities } from "@/lib/actions/community.action";
import UserLinkCard from "../cards/UserLinkCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import CommunityLinkCard from "../cards/CommunityLinkCard";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const resultUsers = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // temporary solution, randomizing users
  const randomUsers = [];
  while (randomUsers.length < 5 && resultUsers.users.length > 0) {
    const randomIndex = Math.floor(Math.random() * resultUsers.users.length);
    const randomUser = resultUsers.users.splice(randomIndex, 1)[0];
    randomUsers.push(randomUser);
  }

  const resultCommunities = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // temporary solution, randomizing communities
  const randomCommunities = [];
  while (
    randomCommunities.length < 5 &&
    resultCommunities.communities.length > 0
  ) {
    const randomIndex = Math.floor(
      Math.random() * resultCommunities.communities.length
    );
    const randomCommunity = resultCommunities.communities.splice(
      randomIndex,
      1
    )[0];
    randomCommunities.push(randomCommunity);
  }

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        {/* Users list */}
        <div className="flex flex-col">
          {randomUsers.length === 0 ? (
            <p className="no-result">No users</p>
          ) : (
            <>
              {randomUsers.map((user) => (
                <UserLinkCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  username={user.username}
                  imgUrl={user.image}
                  personType="User"
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        {/* Communities list */}
        <div className="flex flex-col">
          {randomCommunities.length === 0 ? (
            <p className="no-result">No communities</p>
          ) : (
            <>
              {randomCommunities.map((community) => (
                <CommunityLinkCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  bio=""
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
