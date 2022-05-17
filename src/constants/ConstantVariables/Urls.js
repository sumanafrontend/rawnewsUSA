const baseUrl = 'https://bluebookblacknews.com/bluebook/app';

export const login = baseUrl + '/login';
export const register = baseUrl + '/signup';
export const temprature = baseUrl + '/fetch-temp';
export const randomAds = baseUrl + '/add-rand';
export const adDetails = baseUrl + '/ad-details';
export const adSearch = baseUrl + '/search-filters';
export const addComplain = baseUrl + '/add-complain';


export const getExclusiveNews = baseUrl + '/news';
export const getExclusiveNewsDetails = baseUrl + '/newsdetails/';
export const newsReport = baseUrl + '/news-report/';
export const postNews = baseUrl + '/post-content';
export const newsLike = baseUrl + '/news-like';
export const getComments = baseUrl + '/comments-list';
export const postComments = baseUrl + '/post-comments';

export const getGettingPaidUser = baseUrl + '/add-premiumuser';
export const getPlaceAd = baseUrl + '/post-ad';

export const getAllStateList = baseUrl + '/state-list';
export const getAllCityList = baseUrl + '/city-list';
export const getAllCountryList = baseUrl + '/country-list';
export const getPages = baseUrl + '/pages';
export const getAllCategory = baseUrl + '/categorylist';
export const submitCategory = baseUrl + '/category-user';
export const userDetails = baseUrl + '/user-details';

export const submitTransaction = baseUrl + '/api/v1/transaction/create';
export const getTransactionThumbnail = baseUrl + '/api/v1/transaction/';

export const getAllDivisions = baseUrl + '/api/v1/division/getall';
export const createDivision = baseUrl + '/api/v1/division/create';
export const updateDivision = baseUrl + '/api/v1/division/update';
export const deleteDivision = baseUrl + '/api/v1/division/delete';

export const getAllTypes = baseUrl + '/api/v1/type/getall';
export const getAllTypesByDivision = baseUrl + '/api/v1/type/division'; 
export const createType = baseUrl + '/api/v1/type/create';
export const updateType = baseUrl + '/api/v1/type/update';
export const deleteType = baseUrl + '/api/v1/type/delete';

export const getAllSubTypes = baseUrl + '/api/v1/subtype/getall';
export const getAllTypesByType = baseUrl + '/api/v1/subtype/type'; 
export const createSubType = baseUrl + '/api/v1/subtype/create';
export const updateSubType = baseUrl + '/api/v1/subtype/update';
export const deleteSubType = baseUrl + '/api/v1/subtype/delete';

