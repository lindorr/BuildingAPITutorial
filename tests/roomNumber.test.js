const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

//GET
//check that courses returns a 200 response and the full roomNumber and its corresponding course json
it('Gets the test endpoint to the roomNumbers database', async done => {
    const response = await request.get('/roomnumbers')
    roomNumbers = {"roomNumbers": [
        {courseName: 'CEG4166',roomNumber:201},
        {courseName: 'SEG2105',roomNumber:202},
        {courseName: 'CHG4361',roomNumber:203},
        {courseName: 'CSI2110',roomNumber:204},
        {courseName: 'MAT1341',roomNumber:205}
    ]}
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(roomNumbers)
    done()
  })
  //check that 404 error is thrown when a non existent courseName is selected
  it('Gets the test endpoint when a course name does not exist', async done => {
    const response = await request.get('/roomnumbers/SEG9870')
    expect(response.status).toBe(404)
    done()
  })