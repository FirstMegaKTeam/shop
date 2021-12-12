const getGradeAverage = (rating) => {
  const ratingNumberArr = rating.map((ratingObj) => ratingObj.rating);

  const qualityRating = ratingNumberArr.length;

  return (ratingNumberArr.reduce((acc, cur) => acc + cur, 0) / qualityRating).toFixed(2);
};

const addPossibilitiesEdit = (arrayFromDb) => (arrayFromDb
  .map((oneRecordBefore) => oneRecordBefore
    .get({ plain: true })));

module.exports = {
  getGradeAverage,
  addPossibilitiesEdit,
};
