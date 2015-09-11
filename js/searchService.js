/**
 * searchService.js
 */

define(['constants', 'jquery'], function(Constants) {
  'use strict';

  return {
    fetch: function(searchTerm) {

      // If blank search, render no results
      if (!searchTerm.length) {
        $.publish('search:exitResults');
      }

      var searchUrl = Constants.getSearchUrlForTerm(searchTerm);
       
      // MOCK DATA:
      var response = {"results": [{"url": "https://colleges.niche.com/abc-bartending-school/", "location": "Columbus, OH", "id": "0517BC02-D20D-48B9-AF9D-6772D18D7156", "name": "ABC Bartending School"}, {"url": "https://colleges.niche.com/abc-beauty-academy/", "location": "Garland, TX", "id": "04BF4548-D323-48F6-B13E-0D6B01DFC25E", "name": "ABC Beauty Academy"}, {"url": "https://colleges.niche.com/abc-beauty-college/", "location": "Arkadelphia, AR", "id": "CED51B71-284F-433A-8BCB-5D467F207B42", "name": "ABC Beauty College"}, {"url": "https://colleges.niche.com/abcott-institute/", "location": "Southfield, MI", "id": "BDF76ECA-954E-43F3-828F-30B4CA3B0C06", "name": "Abcott Institute"}, {"url": "https://colleges.niche.com/abdill-career-college-inc/", "location": "Medford, OR", "id": "47D65C02-A3F1-486C-9ECB-D52E83488025", "name": "Abdill Career College"}, {"url": "https://colleges.niche.com/abi-school-of-barbering--and--cosmetology----chelsea/", "location": "New York City, NY", "id": "56AA0050-627B-44C1-9E71-03761E8C3868", "name": "ABI School of Barbering & Cosmetology - Chelsea"}, {"url": "https://colleges.niche.com/abi-school-of-barbering--and--cosmetology----tribeca/", "location": "New York City, NY", "id": "A6A1AEDE-4393-48FE-A34B-B313B826D042", "name": "ABI School of Barbering & Cosmetology - Tribeca"}, {"url": "https://colleges.niche.com/abilene-christian-university/", "location": "Abilene, TX", "id": "6F3EEB2F-6FFF-4C07-A308-6F33984AF00E", "name": "Abilene Christian University"}, {"url": "https://colleges.niche.com/abington-memorial-hospital-dixon-school-of-nursing/", "location": "Willow Grove, PA", "id": "89033D95-DA64-4033-9E8E-9A28F2FED9DF", "name": "Abington Memorial Hospital Dixon School of Nursing"}, {"url": "https://colleges.niche.com/abraham-baldwin-agricultural-college/", "location": "Tifton, GA", "id": "822F0DBD-8A78-4518-A306-74109E09C971", "name": "Abraham Baldwin Agricultural College"}, {"url": "https://colleges.niche.com/abraham-lincoln-university/", "location": "Los Angeles, CA", "id": "10E8AAD0-6714-4C4A-B87C-169767519061", "name": "Abraham Lincoln University"}, {"url": "https://colleges.niche.com/abram-friedman-occupational-center/", "location": "Los Angeles, CA", "id": "A072BA60-5BD7-4DFD-AB24-119ADCB81BA7", "name": "Abram Friedman Occupational Center"}, {"url": "https://colleges.niche.com/belmont-abbey-college/", "location": "Belmont, NC", "id": "5E7175E2-0EB4-47D4-97B0-DD60AE83E079", "name": "Belmont Abbey College"}, {"url": "https://colleges.niche.com/henry-abbott-technical-high-school/", "location": "Danbury, CT", "id": "5A75AE8A-D80D-4B37-837B-F7C7EBBFF856", "name": "Henry Abbott Technical High School"}, {"url": "https://colleges.niche.com/penn-state-abington/", "location": "Abington Township, PA", "id": "6D15D5CB-5C9B-4109-8C27-7FC4FC288DF9", "name": "Penn State Abington"}, {"url": "https://colleges.niche.com/texas-college-of-cosmetology----abilene/", "location": "Abilene, TX", "id": "363948CB-0002-4766-9402-21685EEA85EF", "name": "Texas College of Cosmetology - Abilene"}, {"url": "https://colleges.niche.com/university-of-aberdeen/", "location": "null", "id": "7595A752-ECB1-4F57-8C6C-E7A47F09FF89", "name": "University of Aberdeen"}, {"url": "https://colleges.niche.com/vancouver-career-college-abbotsford/", "location": "null", "id": "F99D6BF1-03C2-4FBF-9686-CC49B110215E", "name": "Vancouver Career College - Abbotsford"}], "total": 18};

      // JSONPUtil.LoadJSONP(searchUrl, function(response) {
        // If we don't get a response, something went wrong,
        // so just let the user know there's an error
        if (!response) {
          $.publish('search:jsonLoadError', {
            message: Constants.ERROR_SEARCH_DEFAULT
          });
          return;
        }

        $.publish('search:jsonLoadSuccess', response);
      // });
    }
  };

});