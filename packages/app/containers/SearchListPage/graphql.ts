import gql from 'graphql-tag';

export const QuerySearchDoctor = gql`
  query QuerySearchDoctor(
    $word: String
    $whereCity1: DoctorWhereInput
    $whereCity2: DoctorWhereInput
    $skip: Int
    $first: Int
  ) {
    doctors(where: $whereCity1, skip: $skip, first: $first) {
      id
      name
      nameArabic
      specialities {
        id
        speciality
        specialityArabic
      }
      #rating
      picture
      gender
      designation
      phone
      hospital {
        id
        hospital
        hospitalArabic
        location
        address
        latitude
        longitude
        countryId {
          id
        }
        city {
          id
        }
        insurances {
          id
        }
      }
    }
    specialities(
      where: {
        OR: [
          { speciality_contains: $word }
          { specialityArabic_contains: $word }
        ]
      }
    ) {
      id
      doctors(where: $whereCity2, skip: $skip, first: $first) {
        id
        name
        nameArabic
        specialities {
          id
          speciality
          specialityArabic
        }
        #rating
        picture
        gender
        designation
        phone
        hospital {
          id
          hospital
          hospitalArabic
          address
          location
          latitude
          longitude
          countryId {
            id
          }
          city {
            id
          }
          insurances {
            id
          }
        }
      }
    }
    hospitals(
      first: 5
      where: {
        OR: [{ hospital_contains: $word }, { hospitalArabic_contains: $word }]
      }
    ) {
      id
      doctors(where: $whereCity2, skip: $skip, first: $first) {
        id
        name
        nameArabic
        specialities {
          id
          speciality
          specialityArabic
        }
        #rating
        picture
        gender
        designation
        phone
        hospital {
          id
          hospital
          hospitalArabic
          location
          latitude
          longitude
          countryId {
            id
          }
          city {
            id
          }
          insurances {
            id
          }
        }
      }
    }
  }
`;
