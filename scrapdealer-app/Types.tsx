type Order = {

    id?: string,
    dateCreated: Date | undefined,        //Get date/time when submit is clicked
    dateLastUpdated: Date | undefined,    //Set to same dateCreated
    items: string[],
    orderNumber: number,        //Set in backend comparing to order in db with latest creation date
    price: number,              //Calculate in backend?
    scheduledDateTime: Date | undefined,
    scrapDealerId: string,        //Send as null
    status: string,           //Set to CREATED, when scrap dealer takes it it changes to SCHEDULED
    userId: string,     //Get from state which is set after login
    weights: number[],
    address: string,
    notes: string
}

type ScrapDealer = {

    id: string,
    address: string,
    dateOfBirth: Date | undefined,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateCreated: Date | undefined,
    dateLastUpdated: Date | undefined
    pushToken: string

}

export{ Order, ScrapDealer };