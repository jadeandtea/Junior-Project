import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.DomElement;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class WordListCreater {
    String[] endings = new String[] {"1st-grade-spelling-word-list", "second-grade-spelling-words", "third-grade-spelling-words", "fourth-grade-spelling-words", "fifth-grade-spelling-words", "sixth-grade-spelling-words", "7th-grade-spelling-words", "8th-grade-spelling-words", "9th-grade-spelling-words"};
    private String folderPath;

    public WordListCreater(String folderPath){
        this.folderPath = folderPath;
    }

    public void createList(boolean forceUpdate) throws IOException {

        WebClient client = new WebClient();
        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);

        for(String ending : endings){
            File gradeFile = new File(folderPath + "/" + ending + ".txt");

            if(!gradeFile.exists() || forceUpdate){  //only get another list of words if the list doesn't exist

                StringBuilder outputString = new StringBuilder();
                String URL = "https://www.spelling-words-well.com/" + ending + ".html";
                HtmlPage page = client.getPage(URL);

                List<DomElement> wordList = page.getByXPath("//td[@align='undefined']");

                for (DomElement domElement : wordList) {

                    HtmlElement word = (HtmlElement) domElement;
                    outputString.append(word.getTextContent()).append("\n");

                }

                try {

                    PrintWriter outputFile = new PrintWriter(gradeFile, StandardCharsets.UTF_8);
                    outputFile.print(outputString);
                    outputFile.close();

                } catch (IOException e) {

                    e.printStackTrace();

                }
            }
        }
    }

    public void createList() throws IOException {
        createList(false);
    }
}
