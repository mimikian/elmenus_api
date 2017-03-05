var elasticsearch = require('elasticsearch');
var utils = require("./lib/utils.js");

var elasticClient = new elasticsearch.Client({  
  host: 'localhost:9200',
  log: 'info'
});

// Declaring Variables
var indexName = "restaurants";

// Search Control Options
var PAGE_SIZE = 10;

/**
* Delete an existing index
*/
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
  return elasticClient.indices.create({
    index: indexName
  });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
  return elasticClient.indices.exists({
    index: indexName
  });
}

/**
* initialize the mapping for the restaurants index
*/
function initMapping() {  
  return elasticClient.indices.putMapping({
    index: indexName,
    type: "restaurant",
    body: {
      properties: {
        id: { type: "long" },
        name_en: { type: "string"},
        name_ar: { type: "string"},
        opening_hr: {
          type:   "date",
          format: "hour_minute_second"
        },
        closing_hr: {
          type:   "date",
          format: "hour_minute_second"
        },
        photos_count: { type: "long" },
        branches_count: { type: "long" },
        reviews_count: { type: "long" },
        menus_count: { type: "long" },
        description_ar: { type: "long" },
        description_en: { type: "long" },
        delivery_charge: { type: "long"},
        created_at: { type: "long" },
        updated_at: { type: "long" },
        city_id: { type: "long"}
      }
    }
  });
}

/**
* add a restaurant row to restaurants index
*/
function addDocument(document) {  
  return elasticClient.index({
    index: indexName,
    type: "restaurant",
    id: document.id,
    body: {
      name_en: document.name_en,
      name_ar: document.name_ar,
      opening_hr: utils.convertTo24Hour(document.opening_hr),
      closing_hr: utils.convertTo24Hour(document.closing_hr),
      created_at: document.created_at
    }
  });
}

/**
* add a restaurant row to restaurants index
*/

function getAllRestaurants(input) { 
  var page = input.page
  if(input.page === undefined)
    page = 1;
  var size = PAGE_SIZE;
  return elasticClient.search({
    index: indexName,
    type: "restaurant",
    body: {
      from: page*size,
      size: size,
      query : {
        match_all: {}
      }
    }
  })
}

exports.getAllRestaurants = getAllRestaurants;
exports.addDocument = addDocument;
exports.indexExists = indexExists; 
exports.initMapping = initMapping;