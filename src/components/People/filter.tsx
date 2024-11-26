export const filterUserData = (
  dbUsers: any,
  query: string,
  filter: string
): any => {
  const filterByProperty = (property: string) => {
    //console.log(dbUsers);
    return dbUsers
      .map((user: any) => {
        //console.log(user[property]);
        if (user[property]?.toLowerCase().includes(query.toLowerCase()))
          return user;
      })
      .filter((user: any): user is any => user !== undefined);
  };

  let filteredUsers: any[] = [];

  //console.log(filter);
  switch (filter) {
    case "Name":
      filteredUsers = filterByProperty("username");
      break;
    case "Role":
      filteredUsers = filterByProperty("role");
      break;
    case "Organization":
      filteredUsers = filterByProperty("org");
      break;
    default:
      break;
  }

  //console.log(filteredUsers);
  return filteredUsers;
};
