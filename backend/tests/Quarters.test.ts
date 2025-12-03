// testing whether dropping course into quarter adds course to that quarter
import axios from 'axios';
import handleDropLogic from '../../src/Dashboard/Year/handleDropLogic';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// test handleDropLogic which is called when a course is dropped into a quarter
test("handleDropLogic adds course to quarter", async () => {
    // mock axios post response
    mockedAxios.post.mockResolvedValue({
            data: 111
        });

    // create fake course json to drop
    const fakeCourse = {
        course_id: 1,
        course_number: "COM SCI 1",
        course_name: "Intro",
        course_units: 4,
        category: "Major"
    };

    // call handleDropLogic with fake course json and other parameters
    await handleDropLogic(
        {
            courseJson: JSON.stringify(fakeCourse),
            userId: 1,
            yearIndex: 1,
            quarterName: 'Fall'}
    );

    // assert that axios post was called with correct url and data
    expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3001/quarter/addCourse',
        {
            userId: 1,
            courseId: 1,
            yearIndex: 1,
            quarterName: 'Fall'
        }
    );
});