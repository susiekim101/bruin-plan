import axios from 'axios';
import handleDropLogic from '../../src/Dashboard/Year/handleDropLogic';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('handleDropLogic', () => {
    test('adds course to quarter', async () => {

        mockedAxios.post.mockResolvedValue({
            data: 111
        });

        const fakeCourse = {
            course_id: 1,
            course_number: "COM SCI 1",
            course_name: "Intro",
            course_units: 4,
            category: "Major"
        };

        await handleDropLogic(
            {
                courseJson: JSON.stringify(fakeCourse),
                userId: 1,
                yearIndex: 1,
                quarterName: 'Fall'}
        );

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
});
