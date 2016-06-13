var conn = new Mongo();
var db = conn.getDB("recipe");

var id = ObjectId("565e39d0ca749f6f536b7723");

var bulkInsert = db.recipes.initializeUnorderedBulkOp();
var bulkRemove = db.d_recipes.initializeUnorderedBulkOp();
db.d_recipes.find({"_id":id}).forEach(
  function(doc){
    bulkInsert.insert(doc);
    bulkRemove.find({_id:doc._id}).removeOne();
  }
)
bulkInsert.execute();
bulkRemove.execute();
