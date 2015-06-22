/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    cover: {
      model: 'Attachment'
    },
    content: {
      type: 'text',
      required: true
    },
    tags: {
      type: 'string'
    },
    preview: {
      type: 'string'
    },
    category: {
      model: 'Category'
    },
    author: {
      type: 'string'
    },
    published: {
      type: 'boolean'
    },
    publishedAt: {
      type: 'datetime'
    },
    attachments: {
      collection: 'Attachment',
      via: 'article'
    }
  }
};

