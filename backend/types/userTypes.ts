import { RowDataPacket } from "mysql2";

export interface createUserProps {
    'first_name': string
    'last_name': string
    'email': string
    'password': string
    'major': string
}

export interface addToUserPlanProps {
    user_id: number,
    major_id: number
}

export interface MajorRows extends RowDataPacket {
    major_id: number,
}

export interface UserRows extends RowDataPacket {
    'user_id': number
    'first_name': string
    'last_name': string
    'email': string
    'password_hash': string
    'major_id': number
}

export interface UserData {
    'user_id': number
    'first_name': string
    'last_name': string
    'email': string
    'password_hash': string
    'major_id': number
}
