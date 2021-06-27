
const queryBuilder = (rawQuery, params) => {
    const newObj = {};
    params.map((p) => {
      if (rawQuery[p]) newObj[p] = rawQuery[p];
      return 0; // justo for the linter :P
    });
    return newObj;
  };
  
  const mapAndBuildModel = (model, obj) => {
    for (const key in obj) model[key] = obj[key]
  }
exports.queryBuilder = queryBuilder;
exports.mapAndBuildModel = mapAndBuildModel; 