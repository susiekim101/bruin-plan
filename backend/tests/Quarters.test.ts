import  { handleDropLogic }  from '../../src/Dashboard/Year/Quarters.tsx';
import { addCoursesToQuarter } from '../controllers/addCoursesToQuarter.ts';

jest.mock('../controllers/addCoursesToQuarter');

test('dropping course into quarter container adds it to user\'s plan', async () =>  {
    // create a mock add id for 
    const mockAdd = addCoursesToQuarter as jest.Mock;
    mockAdd.mockResolvedValue(111);
    const mockCourseJson = `("course_id":1,"course_number":"CHEM 20A","course_name":"Chemical Structure","course_units":4,"category":"Major"}`

    const id = handleDropLogic({courseJson: mockCourseJson, userId: 1, yearIndex: 1, quarterName: 'Fall'});

    expect(mockAdd).toHaveBeenCalledWith({ userId: 1, courseId: 1, year: 1, quarter: 'Fall' });
    expect(manager.quarters[1].Fall).toContainEqual({ id: 111, courseId: 1 });
    expect(id).toBe(111);
})