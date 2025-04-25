import { Component, OnInit } from '@angular/core';
const USERS_LOCAL_STORAGE_KEY = 'users-data';
const USERS_Filled = 'users-filled';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 
  title = 'clinics-management-system';

  ngOnInit(): void {
      // this.fillData()
  }

//  fillData =():void=>{
//   // const filledStatus = !!localStorage.getItem(USERS_Filled);
//   const filledStatus = localStorage.getItem(USERS_Filled);

//   if (!filledStatus) {
//     const users: User[] = [
//       {
//         id: 'user-1',
//         name: "Abdullah Ayman",
//         email: "abdullah@gmail.com",
//         type: 'admin',
//         password: "12234",
//         created_at: new Date("2024-03-01")
//       },
//       {
//         id: 'user-2',
//         name: "Ola mayasrah",
//         email: "ola@gmail.com",
//         type: 'user',
//         permissions: ['user-add', 'users-list',],
//         password: "12543",
//         created_at: new Date('2024-03-15')
//       },
//       {
//         id: 'user-3',
//         name: "Farah Tareq ",
//         email: "farah@gmail.com",
//         type: 'user',
//         permissions: ['users-list', 'users-details'],
//         password: "163334",
//         created_at: new Date('2024-04-05')
//       },
//     ]

 }
 
