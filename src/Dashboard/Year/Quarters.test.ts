import { handleDrop } from './QuarterManager.ts';
import { addCoursesToQuarter } from '../../../backend/controllers/addCoursesToQuarter';

jest.mock('../../../backend/controllers/addCoursesToQuarter');

test('dropping course into quarter container adds it to user\'s plan', async () =>  {
    // create a mock add id for 
    const mockAdd = addCoursesToQuarter as jest.Mock;
    mockAdd.mockResolvedValue(111);

    const id = handleDrop(1, 1, 'Fall');

    expect(mockAdd).toHaveBeenCalledWith({ userId: 1, courseId: 1, year: 1, quarter: 'Fall' });
    expect(manager.quarters[1].Fall).toContainEqual({ id: 111, courseId: 1 });
    expect(id).toBe(111);
})