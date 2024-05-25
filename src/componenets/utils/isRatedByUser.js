export const isRatedByUser = (reqUserId, post) => {
    const userRating = post.rating.find((userRating) => userRating.user.id === reqUserId);

    if (userRating) {
        return {
            isRated: true,
            ratingValue: userRating.value
        };
    } else {
        return {
            isRated: false,
            ratingValue: null
        };
    }
};
