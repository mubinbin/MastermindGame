package com.mb.masterMindGame.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

@Service
public class GameService {

	public String[] getNumbers(int num, int min, int max) throws IOException {
		
		URL url = new URL("https://www.random.org/integers/?num="+ num +"&min="+ min +"&max="+ max +"&col=1&base=10&format=plain&rnd=new");
        HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        int resCode = connection.getResponseCode();
        
        String readLine = null;

        if(resCode == HttpsURLConnection.HTTP_OK){
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            readLine = in.readLine();
            
            // StringBuffer res = new StringBuffer();
            String[] res = new String[num];
            int i = 0;
            while(readLine != null){
                res[i++] = readLine;
                readLine = in.readLine();
            }
            in.close();

            return res;
        }

        return null;
		
	}
}
