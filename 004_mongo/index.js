/**
    Mongo DB Test by Mocha

    Reference:
        http://www.slideshare.net/doryokujin/mongodb-9208855（Japanese）
        http://mongodb.github.io/node-mongodb-native/api-generated/collection.html（English）
*/
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;


/*
    SetUp
*/
var db;
var collection;
before(function (done) {
    MongoClient.connect('mongodb://localhost:27017/test', function (err, aDb) {
        assert.equal(null, err);
        db = aDb;
        collection = db.collection('user');
        done();
    });
});
beforeEach(function (done) {
    var datas = [
        {name: 'Yohei',  age: 29, sex: 1, address: 'Yokohama', extra: {salary: 1000}},
        {name: 'Shiri',  age: 29, sex: 2, address: 'Osaka',    extra: {salary: 100}},
        {name: 'Yamada', age: 35, sex: 1,                      extra: {salary: 5000}},
        {name: 'Lucy',   age: 12, sex: 2,                      extra: {salary: 2000}},
        {name: 'Guccy',  age: 60, sex: 1, address: 'Aomori',   extra: {salary: 1050}}
    ];
    collection.remove({}, function (err) {
        assert.equal(null, err);
        collection.insert(datas, function (err) {
            done(err);
        });
    });
});
/*
    TearDown
*/
after(function () {
    db.close();
});


/*
    Test: Select
*/
describe('select', function () {

    it('find all', function (done) {
        collection.find({}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(5, docs.length);
            done();
        });
    });

    it('find by one equivalence', function (done) {
        collection.find({name: 'Yohei'}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(1, docs.length);
            assert.equal(29, docs[0].age);
            done();
        });
    });

    it('find by two equivalences', function (done) {
        collection.find({age: 29, sex: 2}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(1, docs.length);
            assert.equal('Shiri', docs[0].name);
            done();
        });
    });

    it('find by not equal', function (done) {
        collection.find({age: {$ne: 29}}).toArray(function (err, docs) {
            assert.equal(null, err) ;
            assert.equal(3, docs.length);
            assert.equal(35, docs[0].age);
            assert.equal(12, docs[1].age);
            assert.equal(60, docs[2].age);
            done();
        });
    });

    it('find by gt', function (done) {
        collection.find({age: {$gt: 29}}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(2, docs.length);
            assert.equal(35, docs[0].age);
            assert.equal(60, docs[1].age);
            done();
        });
    });

    it('find by gte', function (done) {
        collection.find({age: {$gte: 29}}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(4, docs.length);
            assert.equal(29, docs[0].age);
            assert.equal(29, docs[1].age);
            assert.equal(35, docs[2].age);
            assert.equal(60, docs[3].age);
            done();
        });
    });

    it('find by lt', function (done) {
        collection.find({age: {$lt: 29}}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(1, docs.length);
            assert.equal(12, docs[0].age);
            done();
        });
    });

    it('find by lte', function (done) {
        collection.find({age: {$lte: 29}}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(3, docs.length);
            assert.equal(29, docs[0].age);
            assert.equal(29, docs[1].age);
            assert.equal(12, docs[2].age);
            done();
        });
    });

    it('find by regexp', function (done) {
        collection.find({name: /cy/}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(2, docs.length);
            assert.equal('Lucy', docs[0].name);
            assert.equal('Guccy', docs[1].name);
            done();
        });
    });

    it('find by or', function (done) {
        collection.find({$or: [{name: 'Yohei'}, {age: 60}]}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(2, docs.length);
            assert.equal('Yohei', docs[0].name);
            assert.equal('Guccy', docs[1].name);
            done();
        });
    });

    it('find by exists', function (done) {
        collection.find({address: {$exists: true}}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(3, docs.length);
            assert.equal('Yokohama', docs[0].address);
            assert.equal('Osaka', docs[1].address);
            assert.equal('Aomori', docs[2].address);
            done();
        });
    });

    it('find only column1', function (done) {
        collection.find({name: 'Yohei'}, {_id: 0, age: 0}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(null, docs[0]._id);
            assert.equal('Yohei', docs[0].name);
            assert.equal(null, docs[0].age);
            assert.equal(1, docs[0].sex);
            done();
        });
    });

    it('find only column2', function (done) {
        collection.find({name: 'Yohei'}, {name: 1, age: 1}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal('Yohei', docs[0].name);
            assert.equal(29, docs[0].age);
            assert.equal(null, docs[0].sex);
            done();
        });
    });

    it('find with sort asc', function (done) {
        collection.find({}).sort({age: 1}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(12, docs[0].age);
            assert.equal(29, docs[1].age);
            assert.equal(29, docs[2].age);
            assert.equal(35, docs[3].age);
            assert.equal(60, docs[4].age);
            done();
        });
    });

    it('find with sort desc', function (done) {
        collection.find({}).sort({age: -1}).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(60, docs[0].age);
            assert.equal(35, docs[1].age);
            assert.equal(29, docs[2].age);
            assert.equal(29, docs[3].age);
            assert.equal(12, docs[4].age);
            done();
        });
    });

    it('find with limit', function (done) {
        collection.find({}).limit(3).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(3, docs.length);
            assert.equal(29, docs[0].age);
            assert.equal(29, docs[1].age);
            assert.equal(35, docs[2].age);
            done();
        });
    });

    it('find with skip', function (done) {
        collection.find({}).skip(3).toArray(function (err, docs) {
            assert.equal(null, err);
            assert.equal(2, docs.length);
            assert.equal('Lucy', docs[0].name);
            assert.equal('Guccy', docs[1].name);
            done();
        });
    });
});


/*
    Test: Distinct
*/
describe('distinct', function () {

    it('distinct normal', function (done) {
        collection.distinct('age', function (err, docs) {
            assert.equal(null, err);
            assert.deepEqual([29, 35, 12, 60], docs);
            done();
        });
    });

    it('distinct by query', function (done) {
        collection.distinct('age', {name: 'Yohei'}, function (err, docs) {
            assert.equal(null, err);
            assert.deepEqual([29], docs);
            done();
        });
    });
});


/*
    Test: Count
*/
describe('count', function () {

    it('count normal', function (done) {
        collection.find({}).count(function (err, count) {
            assert.equal(null, err);
            assert.equal(5, count);
            done();
        });
    });
});

// array find
// 子供フィールド
// update
// update increment
// update push
// update pushAll
// remove
// insert



































