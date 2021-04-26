import {useRouter} from 'next/router';

export default class Episode() {
    const router = useRouter();

    return(
        <h1>{router.query.slug}</h1>
    )

}