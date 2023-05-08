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

const allstars=(id)=>[
  {
    '$match': {
      'productid': id
    }
  }, {
    '$group': {
      '_id': null, 
      '5': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                '$rating', 5
              ]
            }, 1, 0
          ]
        }
      }, 
      '4': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                '$rating', 4
              ]
            }, 1, 0
          ]
        }
      }, 
      '3': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                '$rating', 3
              ]
            }, 1, 0
          ]
        }
      }, 
      '2': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                '$rating', 2
              ]
            }, 1, 0
          ]
        }
      }, 
      '1': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                '$rating', 1
              ]
            }, 1, 0
          ]
        }
      }
    }
  }, {
    '$project': {
      '_id': 0
    }
  }
]
module.exports={allcomments,allstars};