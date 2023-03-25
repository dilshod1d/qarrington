export const checkIfCompanyIsInIsoDate = (company) => {
  return company.companyStatus.companyIsLaunched;
};

export const checkIfCompanyHasPastIsoDate = (company) => {
  // If company is on iso date
  if (company.companyStatus.companyIsLaunched) return false;

  const parseCompany = JSON.parse(JSON.stringify(company));
  const hour = parseCompany.companyIso.companyIsoTime;
  const isoTime = new Date(
    parseCompany.companyIso.companyIsoDate.split('T')[0] + 'T' + (hour.split(':')[0].length === 1 ? '0' + hour : hour) + ':00.000+00:00'
  );
  const now = new Date(Date.now());
  const endIsoTime = new Date(isoTime.getTime() + 1000 * 60 * 60 * 24 * 7);

  return now > endIsoTime;
};
