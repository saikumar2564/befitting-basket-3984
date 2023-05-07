const allcomments=(id)=>[
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'userID', 
        'foreignField': '_id', 
        'as': 'result'
      }
    }, {
      '$unwind': {
        'path': '$result'
      }
    }, {
      '$project': {
        'name': '$result.name', 
        'userID': 1, 
        'date': 1, 
        'productid': 1, 
        'description': 1, 
        'rating': 1, 
        'title': 1
      }
    }, {
      '$match': {
        'productid': id
      }
    }
  ];

module.exports={allcomments};