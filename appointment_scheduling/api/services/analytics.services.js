//importing packages
const mongoose = require('mongoose');
const { APPOINTMENT_STATUS_ENUM } = require('../../config/constants');
//importing model
const AppointmentModel = require("../models/appointments");

const timePerDay = async (userId) => {
  try {
    const aggregation= [
      {
        '$match': {
          'userId':mongoose.Types.ObjectId(userId),
          'status': APPOINTMENT_STATUS_ENUM[2]
        }
      }, {
        '$addFields': {
          'day': {
            '$dayOfMonth': '$startTime'
          }, 
          'duration': {
            '$dateDiff': {
              'startDate': '$startTime', 
              'endDate': '$endTime', 
              'unit': 'millisecond'
            }
          }
        }
      }, {
        '$group': {
          '_id': '$day', 
          'totalSpentTime': {
            '$sum': '$duration'
          }
        }
      }, {
        '$project': {
          'day': '$_id', 
          '_id': 0, 
          'totalSpentTime': 1
        }
      }, {
        '$sort': {
          'day': 1
        }
      }
    ]
    return await AppointmentModel.aggregate(aggregation);
    
  } catch (error) {
    throw error;
  }
};

const morningEvening=async (userId) => {
    try {
      const aggregation=[
        {
          '$match': {
            'userId': mongoose.Types.ObjectId(userId), 
            'status': 'completed'
          }
        }, {
          '$addFields': {
            'day': {
              '$dayOfMonth': '$startTime'
            }, 
            'startHour': {
              '$hour': {
                'date': '$startTime', 
                'timezone': '+0500'
              }
            }, 
            'endHour': {
              '$hour': {
                'date': '$endTime', 
                'timezone': '+0500'
              }
            }, 
            'startTime': {
              '$dateAdd': {
                'startDate': '$startTime', 
                'unit': 'hour', 
                'amount': 5
              }
            }, 
            'endTime': {
              '$dateAdd': {
                'startDate': '$endTime', 
                'unit': 'hour', 
                'amount': 5
              }
            }, 
            'endDate': {
              '$dateToParts': {
                'date': '$endTime'
              }
            }
          }
        }, {
          '$set': {
            'endDate': {
              '$dateFromParts': {
                'year': '$endDate.year', 
                'month': '$endDate.month', 
                'day': '$endDate.day', 
                'hour': 12
              }
            }
          }
        }, {
          '$addFields': {
            'amTime': {
              '$switch': {
                'branches': [
                  {
                    'case': {
                      '$and': [
                        {
                          '$lt': [
                            '$startHour', 12
                          ]
                        }, {
                          '$lt': [
                            '$endHour', 12
                          ]
                        }
                      ]
                    }, 
                    'then': {
                      '$dateDiff': {
                        'startDate': '$startTime', 
                        'endDate': '$endTime', 
                        'unit': 'millisecond'
                      }
                    }
                  }, {
                    'case': {
                      '$and': [
                        {
                          '$lt': [
                            '$startHour', 12
                          ]
                        }, {
                          '$gte': [
                            '$endHour', 12
                          ]
                        }
                      ]
                    }, 
                    'then': {
                      '$dateDiff': {
                        'startDate': '$startTime', 
                        'endDate': '$endDate', 
                        'unit': 'millisecond'
                      }
                    }
                  }
                ], 
                'default': 0
              }
            }, 
            'pmTime': {
              '$switch': {
                'branches': [
                  {
                    'case': {
                      '$gt': [
                        '$startHour', 12
                      ]
                    }, 
                    'then': {
                      '$dateDiff': {
                        'startDate': '$startTime', 
                        'endDate': '$endTime', 
                        'unit': 'millisecond'
                      }
                    }
                  }, {
                    'case': {
                      '$and': [
                        {
                          '$lt': [
                            '$startHour', 12
                          ]
                        }, {
                          '$gte': [
                            '$endHour', 12
                          ]
                        }
                      ]
                    }, 
                    'then': {
                      '$dateDiff': {
                        'startDate': '$endDate', 
                        'endDate': '$endTime', 
                        'unit': 'millisecond'
                      }
                    }
                  }
                ], 
                'default': 0
              }
            }
          }
        }, {
          '$group': {
            '_id': '$day', 
            'amTimeSpent': {
              '$sum': '$amTime'
            }, 
            'pmTimeSpent': {
              '$sum': '$pmTime'
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'day': '$_id', 
            'amTimeSpent': 1, 
            'pmTimeSpent': 1
          }
        }
      ]
      return await AppointmentModel.aggregate(aggregation);
      
    } catch (error) {
      throw error;
    }
  };


module.exports = { timePerDay,morningEvening };
