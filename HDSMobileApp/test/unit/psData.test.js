'use strict';

import db from '../../app/scripts/modules/psData';
import _ from 'lodash';
import Q from 'q';

var directors, films, directorsData, filmsData;
var BIG_DATA_SIZE = 100000, BIG_DATA = [], BIG_DATA_GROUPS = 100;

describe('psData', function() {

  beforeEach(function(){
    db.reset();
    //Some sample relational data
    directors = 'directors', films = 'films',
        directorsData = [
          {name: 'Martin Scorsese', directorId: 1},
          {name: 'Francis Ford Coppola', directorId: 2},
          {name: 'Steven Spielberg', directorId: 3},
          {name: 'Quentin Tarantino', directorId: 4},
        ],
        filmsData = [
          {title: 'Taxi', filmId: 1, directorId: 1},
          {title: 'Raging Bull', filmId: 2, directorId: 1},
          {title: 'The Godfather', filmId: 3, directorId: 2},
          {title: 'Jaws', filmId: 4, directorId: 3},
          {title: 'ET', filmId: 5, directorId: 3},
          {title: 'Raiders of the Lost Ark', filmId: 6, directorId: 3},
        ]
  });

  it('should EXIST', ()=>{
    expect(db).toBeDefined();
  });

  it('should ADD AN OBJECT to a collection', ()=>{
    //Add an object to a new collection
    db.add(directors, directorsData[0]);

    //Make sure the collection is created
    var collection = db.db.getCollection(directors);
    expect(collection).toBeDefined();

    //Test
    var results = db.find(directors).data();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].name).toBe(directorsData[0].name)
  });

  it('should ADD AN ARRAY to a collection', ()=>{
    db.add(directors, directorsData);
    var results = db.find(directors).data();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(directorsData.length);
  });

  // Relational Data tests =========================
  describe('Relational data functions', function(){
    beforeEach(function(){
      db.add(directors, directorsData);
      db.add(films, filmsData);
    })

    it('should REMOVE from a collection', ()=>{
      //Remove item
      var toRemove = db.find(directors).data()[0];
      db.remove(directors, toRemove);

      //test
      var newResult = db.find(directors).data();
      expect(newResult.length).toBe(directorsData.length - 1);
    });

    it('should FIND an item', ()=>{
      //query data
      var allResults = db.find(films).data();
      var singleResult = db.find(films, {title: filmsData[0].title}).data();
      var query = {directorId: 1};
      var multipleResults = db.find(films, query).data();

      //test
      expect(allResults.length).toBe(filmsData.length);
      expect(singleResult.length).toBe(1);
      expect(singleResult[0].title).toBe(filmsData[0].title);
      expect(multipleResults.length).toBe(_.where(filmsData, query).length);
    });

    it('should UPDATE an item in a collection', ()=>{
      //update an item
      var item = db.find(directors).data()[0];
      item.name = "Stanley Kubrick";

      //Get the item
      var results = db.find(directors, {name:item.name}).data();
      expect(results.length).toBe(1);
      expect(results[0].name).toBe(item.name);

    });

    it('should CLEAR COLLECTION', ()=>{
      //Clear Collection
      db.clearCollection(directors);

      //test
      var results = db.find(directors).data()
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);

    });

    it('should REMOVE COLLECTION', ()=>{
      //Remove collection
      db.removeCollection(directors);

      //test
     var hasCollection = _.where(db.getCollections(), {name: directors}).length > 0;
     expect(hasCollection).toBe(false);

    });

    it('should JOIN two collections into a clone object', ()=>{
      //Join
      var join = psData.join(directors, films, 'directorId');
      expect(Array.isArray(join)).toBe(true);
      expect(join.length).toBe(7);

      //Edit the data to ensure it is cloned
      var item = join[0];
      item.name = "testname";
      item.title = "testtitle";

      //Updated data
      var directorItems = _.pluck(psData.find(directors).data(), 'name');
      expect(_.contains(directorItems, 'testname')).toBe(false);

      var filmItems = _.pluck(psData.find(directors).data(), 'title');
      expect(_.contains(filmItems, 'testtitle')).toBe(false);

    });

    it('should JOIN any combitation of collection names and arrays', ()=>{
      var directorData = psData.find(directors).data();
      var filmData = psData.find(films).data();
      var key1 = 'directorId'

      var join1 = psData.join(directors, films, key1);
      var join2 = psData.join(directorData, films, key1);
      var join3 = psData.join(directors, filmData, key1);
      var join4 = psData.join(directorData, filmData, key1);

      expect(join1.length).toBeGreaterThan(0);
      expect(JSON.stringify(join1)).toBe(JSON.stringify(join2));
      expect(JSON.stringify(join1)).toBe(JSON.stringify(join3));
      expect(JSON.stringify(join1)).toBe(JSON.stringify(join4));
    })

    it('should JOIN on different key names', ()=>{
      var rightKey = 'testkey';
      var leftKey = 'directorId';
      var rightTable = psData.find(films).data();
      rightTable[0][rightKey] = 1;

      var join = psData.join(directors, films, leftKey, rightKey);
      var matches = join.filter((item)=>{
        return typeof item[rightKey] !== 'undefined'
      });
      expect(matches.length).toBeLessThan(join.length);
      expect(matches.length).toBeGreaterThan(0);

      matches.forEach((item)=>{
        if(item[rightKey])
          expect(item[rightKey]).toBe(item[leftKey]);
      });


    })

    it('should UPDATE WHERE a single condition is met', ()=>{
      var update = {title: 'test title'};
      var query = {directorId: 1}

      psData.updateWhere(films, query, update);
      var results = psData.find(films, query).data()
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      results.forEach((result)=>{
        expect(result.title).toBe(update.title);
      });
    });

    it('should UPDATE WHERE a compound condition is met', ()=>{
      var update = {title: 'test title'};
      var query = {directorId: 3, title: 'Jaws'}
      psData.updateWhere(films, query, update);
      var results = psData.find(films, {directorId: 3}).find({title: update.title}).data();

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      results.forEach((result)=>{
        expect(result.title).toBe(update.title);
      });
    });



    it('should UPDATE WHERE multiple conditions are met', ()=>{
      var update = {title: 'test title'};
      var query = {directorId: 1, filmId: 2}

      psData.updateWhere(films, query, update);

      var data = psData.find(films, {directorId: query.directorId}).data();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(1);

      data.forEach((result)=>{
        if(result.filmId == query.filmId)
          expect(result.title).toBe(update.title);
        else
          expect(result.title).not.toBe(update.title);
      });
    });

    it('should ADD OR UPDATE WHERE', ()=>{
      var directorsLength = psData.find(directors).data().length;
      var newItem = _.clone(psData.find(directors).data()[0]);
      var newItemId = _.max(_.pluck(psData.find(directors).data(), 'directorId')) + 1;

      //add test
      newItem.directorId = newItemId;
      psData.addOrUpdateWhere(directors, {directorId: newItemId}, newItem);
      var newDirectorsLength = psData.find(directors).data().length;
      expect(newDirectorsLength).toBe(directorsLength+1);

      //Update test
      var newFilm = {title: 'testtitle'}

      psData.addOrUpdateWhere(films, {directorId: 3}, newFilm);
      var results = psData.find(films, {directorId: 3}).data();
      results.forEach((updatedFilm)=>{
        expect(updatedFilm.title).toBe(newFilm.title);
      })
    });

    it('should REMOVE WHERE', ()=>{
      var oldLength = psData.find(films).data().length;
      var query = {directorId: 1}
      var removeLength = psData.find(films, query).data().length;
      expect(removeLength).toBeGreaterThan(1);

      psData.removeWhere(films, query);
      var newLength = psData.find(films).data().length;
      expect(newLength).toBe(oldLength - removeLength);
    });

    it('should ADD OR UPDATE ALL', ()=>{
      var newItem = {
        title: 'Test Movie',
        filmId: 100,
        directorId: 1
      }
      var updates = _.cloneDeep(psData.find(films).limit(2).data()).concat(newItem);
      updates[0].title = "film1";
      updates[1].title = "film2";

      //Make sure the new items are cloned,
      expect(psData.find(films, {filmId: updates[0].filmId}).data()[0].title).not.toBe(updates[0].title);

      // psData.addOrUpdateAll(films, 'filmId', updates);

      // var result1 = psData.find(films, {filmId: updates[0].filmId}).data();
      // var result2 = psData.find(films, {filmId: updates[1].filmId}).data();
      // var result3 = psData.find(films, {filmId: newItem.filmId}).data();

      // expect(result1.length).toBe(1);
      // expect(result2.length).toBe(1);
      // expect(result3.length).toBe(1);

      // expect(result1[0].title).toBe(updates[0].title);
      // expect(result2[0].title).toBe(updates[1].title);
      // expect(result3[0].title).toBe(newItem.title);
    })

  // End Work with data tests =========================
  })

  //Start Persistence tests
  describe('Persistence', ()=>{
    it('should save and restore data', (done)=>{

      function deepCompare(array1, array2) {
         var retVal = true;
         array1.forEach((item, i)=>{
            _.forIn(item, (value,key)=>{
              if(key !== '$loki' && key !== 'meta' && value !== array2[i][key]) {
                retVal = false;
              }
            })
          });

         return retVal;
      }

      function resetAndRestore() {
        psData.reset();
        expect(psData.getCollections().length).toBe(0);
        return psData.restore();
      }

      var directorUpdate = {
        name: 'testName',
        newKey: 'testKey'
      }

      //Populate initial data
      expect(psData.getCollections().length).toBe(0);
      psData.add(directors, directorsData);
      psData.add(films, filmsData);
      expect(psData.getCollections().length).toBe(2);

        psData.persist()
        .then(()=>{
          //Reset and restore
          return resetAndRestore();
        })
        .then(()=>{
          //Check database restored correctly
          expect(psData.getCollections().length).toBe(2);
          expect(deepCompare(directorsData, psData.find(directors).data())).toBe(true);
          expect(deepCompare(filmsData, psData.find(films).data())).toBe(true);

          //modify data
          var director = _.assign(psData.find(directors).data()[0], directorUpdate);

          psData.update(directors, director);
          return psData.persist();
        })
        .then(()=>{
          return resetAndRestore();
        })
        .then(()=>{
          var item = psData.find(directors).data()[0]
          expect(item.name).toBe(directorUpdate.name);
          expect(item.newKey).toBeDefined();
          expect(item.newKey).toBe(directorUpdate.newKey);

          //remove a collection and persist
          psData.removeCollection(directors);
          expect(psData.getCollections().length).toBe(1);
          return psData.persist();
        })
        .then(()=>{
          return resetAndRestore();
        })
        .then(()=>{
          //ensure collection was removed
          expect(psData.getCollections().length).toBe(1);
          done();
        })




      })
  })


  // Start Performance tests ==========================
  describe('Performance', ()=>{
    beforeEach(()=>{
      BIG_DATA = [];
      for(var i = 0; i < BIG_DATA_SIZE; i++){
        BIG_DATA.push({
          key1: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key2: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key3: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key4: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key5: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key6: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key7: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key8: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          key9: 'fieldsfieldsfieldsfieldsfieldsfieldsfields',
          index: i,
          group: i%BIG_DATA_GROUPS
        });
      }
    })
    it('should insert 100,000 records in less than 1 second', function(){
      var start = new Date().getTime();
      psData.add('test', BIG_DATA);
      var duration = new Date().getTime() - start;
      expect(psData.find('test').data().length).toBe(BIG_DATA_SIZE);
      expect(duration).toBeLessThan(1000);
      console.log('Insert performance', duration);
    });

    it('should update quickly', ()=>{
      psData.add('test', BIG_DATA)
      var start = new Date().getTime();
      psData.updateWhere('test', {group: 1}, {
        key1: 'new value1',
        key2: 'new value2',
      })
      var duration = new Date().getTime() - start;

      expect(psData.find('test', {key1: 'new value1'}).data().length).toBe(parseInt(BIG_DATA_SIZE/BIG_DATA_GROUPS));
    })
  })


});