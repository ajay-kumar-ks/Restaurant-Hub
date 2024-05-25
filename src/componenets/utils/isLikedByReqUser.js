export const isLikedByReqUser = (reqUserId, post) => {
    // Check the local component state first
    // if (likedByUser) {
    //   return true;
    // }
  console.log("potsssss",post)
    // If not liked locally, check the post's liked array
    for (let user of post.liked) {
      if (reqUserId === user.id) {
        return true;
      }
    }
    return false;
  };
  