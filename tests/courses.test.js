const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

//GET
//check that courses returns a 200 response and the full courses json
  it('Gets the test endpoint to the courses database', async done => {
    const response = await request.get('/courses')
    courses = {"courses": [{"courseName": "CEG4166", "id": 1}, {"courseName": "SEG2105", "id": 2}, {"courseName": "CHG4361", "id": 3}, {"courseName": "CSI2110", "id": 4}, {"courseName": "MAT1341", "id": 5}]}
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(courses)
    done()
  })
  // check that we return the corresponding course to the course id selected
  it('Gets the test endpoint for a specific course id', async done => {
    const response = await request.get('/courses/3')
    course = {"course":{"courseName": "CHG4361", "id": 3}}
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(course)
    done()
  })
  //check that 404 error is thrown when a non existent id is selected
  it('Gets the test endpoint when an id does not exist', async done => {
    const response = await request.get('/courses/20')
    expect(response.status).toBe(404)
    done()
  })
  
  //POST
  //Check that post request works
  it('Gets the test endpoint when post request is sent', async done => {
    const response = await request.post('/courses').send({
      "courseName": 'NewAddedCourse6'
    })
    //course = {"id": 6,"courseName": "NewAddedCourse6"}
    expect(response.body.id).toBe(6)
    expect(response.body.courseName).toBe('NewAddedCourse6')
    expect(response.status).toBe(200)
    //expect(response.body).toStrictEqual(course)
    done()
  })
  //Checks that the new course is added to the database 
  it('Gets the test endpoint to the courses database that has been modified', async done => {
    const response = await request.get('/courses')
    courses = {"courses": [{"courseName": "CEG4166", "id": 1}, {"courseName": "SEG2105", "id": 2}, {"courseName": "CHG4361", "id": 3}, {"courseName": "CSI2110", "id": 4}, {"courseName": "MAT1341", "id": 5},{"courseName": "NewAddedCourse6", "id": 6}]}
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(courses)
    done()
  })

  //throw a 400 error if coursename is less than 7 characters
  it('Gets the test endpoint when post request is not valid', async done => {
    const response = await request.post('/courses').send({
      "courseName": 'Add'
    })
    expect(response.status).toBe(400)
    done()
  })
    //throw a 400 error if coursename contains special characters
    it('Gets the test endpoint when the coursename is not valid', async done => {
      const response = await request.post('/courses').send({
        "courseName": 'CHG3754*$'
      })
      expect(response.status).toBe(400)
      done()
    })

  //throw a 400 error if the send request is empty
  it('Gets the test endpoint when the coursename is empty', async done => {
    const response = await request.post('/courses').send({})
    expect(response.status).toBe(400)
    done()
  })

  //PUT
  //checks that put request works
  it('Gets the test endpoint when put request is sent', async done => {
    const response = await request.put('/courses/3').send({
      "courseName": 'ReplaceCourse3'
    })
    expect(response.body.id).toBe(3)
    expect(response.body.courseName).toBe('ReplaceCourse3')
    expect(response.status).toBe(200)
    done()
  })
  //checks the courses database that has been modified
  it('Gets the test endpoint to the courses database that has been modified', async done => {
    const response = await request.get('/courses')
    courses = {"courses": [{"courseName": "CEG4166", "id": 1}, {"courseName": "SEG2105", "id": 2}, {"courseName": "ReplaceCourse3", "id": 3}, {"courseName": "CSI2110", "id": 4}, {"courseName": "MAT1341", "id": 5},{"courseName": "NewAddedCourse6", "id": 6}]}
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(courses)
    done()
  })
  //Updating a course that does not exist
  it('Gets the test endpoint to the selected course id that does not exist', async done => {
    const response = await request.put('/courses/20')
    expect(response.status).toBe(404)
    done()
  })
  //Updating a course with an invalid name
  it('Gets the test endpoint when post request is not valid', async done => {
    const response = await request.put('/courses/3').send({
      "courseName": 'Add2'
    })
    expect(response.status).toBe(400)
    done()
  })
  it('Gets the test endpoint the coursename is not valid', async done => {
    const response = await request.put('/courses/3').send({
      "courseName": 'CHG3678*$'
    })
    expect(response.status).toBe(400)
    done()
  })

  //DELETE
  //check that delete request works
  it('Gets the test endpoint when delete request is sent', async done => {
    const response = await request.delete('/courses/5')
    expect(response.body.id).toBe(5)
    expect(response.body.courseName).toBe('MAT1341')
    expect(response.status).toBe(200)
    done()
  })
  //check the modified courses database
  it('Gets the test endpoint to the courses database that has been modified', async done => {
    const response = await request.get('/courses')
    courses = {"courses": [{"courseName": "CEG4166", "id": 1}, {"courseName": "SEG2105", "id": 2}, {"courseName": "ReplaceCourse3", "id": 3}, {"courseName": "CSI2110", "id": 4}, {"courseName": "NewAddedCourse6", "id": 6}]}
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(courses)
    done()
  })
  //deleting a non existent course
  it('Gets the test endpoint to the selected course id that does not exist', async done => {
    const response = await request.delete('/courses/20')
    expect(response.status).toBe(404)
    done()
  })
  
