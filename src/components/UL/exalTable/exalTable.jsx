import Table from 'react-bootstrap/Table';

function SmallExample({ data, teacher }) {

  return (
    <Table striped bordered hover >

      {
        teacher ? <>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ID</th>
              <th>JDU</th>
              <th>JLPT</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((e, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{e?.firstname}</td>
                  <td>{e?.lastname}</td>
                  <td>{e?.id}</td>
                  <td>{e?.JLPT}</td>
                  <td>{e?.JDU}</td>
                </tr>
              ))
            }

          </tbody>
        </> : <>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ID</th>
              <th>gmail</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((e, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{e?.firstName}</td>
                  <td>{e?.lastName}</td>
                  <td>{e?.id}</td>
                  <td>{e?.email}</td>
                </tr>
              ))
            }

          </tbody>
        </>
      }
    </Table>
  );
}

export default SmallExample;