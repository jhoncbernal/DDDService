const libCoverage = require('istanbul-lib-coverage');
const { createReporter } = require('istanbul-api');

const unitCoverage = require('../coverage/coverage-final-1.json');
const integrationCoverage = require('../coverage/coverage-final-2.json');

const normalizeJestCoverage = (obj) => {
  const result = obj;
  Object.entries(result).forEach(([k, v]) => {
    if (v.data) result[k] = v.data;
  });
  return result;
};

const map = libCoverage.createCoverageMap();
map.merge(normalizeJestCoverage(integrationCoverage));
map.merge(normalizeJestCoverage(unitCoverage));

const reporter = createReporter();
reporter.addAll(['json', 'lcov', 'text']);
reporter.write(map);
