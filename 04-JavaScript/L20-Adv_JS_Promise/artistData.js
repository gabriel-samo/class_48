async function getSongLyrics(artistName, songName){
    const baseURL = 'https://api.lyrics.ovh/v1/';
    const search = fetch(`${baseURL}${artistName}/${songName}`);
    try{
        let data = await search;
        data = await data.json();
        console.log(data.lyrics);
    } catch (error){
        console.log(`There is an error: ${error}`);
    }
}

async function getSongData(){
    const baseURL = 'https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay';
    const search = fetch(baseURL);
    try{
        let data = await search;
        data = await data.json();
        console.log(data.artists[0].strBiographyEN);
    } catch (error){
        console.log(`There is an error: ${error}`);
    }
}

getSongData();
getSongLyrics('Coldplay','Adventure of a Lifetime');