import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Scanner;

public class EtymologyEndings {
    //Folder to read
    File folder;

    public EtymologyEndings(String pathName){
        this.folder = new File(pathName);
    }

    public void createList(boolean forceUpdate) throws IOException {

        if(folder.isDirectory()) {  //make sure this is a folder

            for (File file : Objects.requireNonNull(folder.listFiles())) {
                File outputFile = new File("EtymologyFiles/" + file.getName().split("-")[0] + "GradeWordEtymologyList.txt");
                if (!outputFile.exists() || forceUpdate) {
                    Scanner reader = new Scanner(file);  //get each file
                    StringBuilder output = new StringBuilder();

                    while (reader.hasNextLine()) {  //read each word

                        String word = reader.nextLine();

                        if (!word.contains(" ")) {  //if it not two words long
                            WebClient client = new WebClient();
                            client.getOptions().setCssEnabled(false);
                            client.getOptions().setJavaScriptEnabled(false);
                            String baseUrl = "https://www.etymonline.com/word/" + word;

                            HtmlPage page;

                            try {  //Only if the page exists, get the word etymology
                                page = client.getPage(baseUrl);
                            } catch (Exception e) {
                                break;
                            }

                            //Get all the definitions of each part of speech
                            //Some words have multiple parts of speech and definitions
                            //  Ex. 'zip' has two verb definitions, two noun definitions, and an adj. definition
                            List<HtmlElement> POS = page.getByXPath("//*[@class='word__name--TTbAA']");
                            List<HtmlElement> items = page.getByXPath("//*[@class='word__defination--2q7ZH']");

                            for (int i = 0; i < items.size(); i++) {

                                HtmlElement partOfSpeech = POS.get(i);
                                HtmlElement etymology = (items.get(i));

                                String header = partOfSpeech.getTextContent();
                                String description = etymology.getTextContent().replaceAll("\\R+", " ");
                                ;

                                //add to output string
                                output.append(word).append(" ").append("(").append(i).append(")").append("      ").append(header).append(" ").append(description).append("\n");
                            }
                        }
                    }

                    try {  //write to an output file
                        FileWriter outputWriter = new FileWriter(outputFile);
                        outputWriter.write(output.toString());
                        outputWriter.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {
            File file = folder;
            File outputFile = new File("EtymologyFiles/" + file.getName().split("-")[0] + "GradeWordEtymologyList.txt");
            if (!outputFile.exists() || forceUpdate) {
                Scanner reader = new Scanner(file);  //get each file
                StringBuilder output = new StringBuilder();

                while (reader.hasNextLine()) {  //read each word

                    String word = reader.nextLine();

                    if (!word.contains(" ")) {  //if it is not two words long
                        WebClient client = new WebClient();
                        client.getOptions().setCssEnabled(false);
                        client.getOptions().setJavaScriptEnabled(false);
                        String baseUrl = "https://www.etymonline.com/word/" + word;

                        HtmlPage page;

                        try {  //Only if the page exists, get the word etymology
                            page = client.getPage(baseUrl);
                        } catch (Exception e) {
                            System.out.println("Page does not exist for word " + word);
                            continue;
                        }

                        //Get all the definitions of each part of speech
                        //Some words have multiple parts of speech and definitions
                        //  Ex. 'zip' has two verb definitions, two noun definitions, and an adj. definition
                        List<HtmlElement> POS = page.getByXPath("//*[@class='word__name--TTbAA']");
                        List<HtmlElement> items = page.getByXPath("//*[@class='word__defination--2q7ZH']");

                        for (int i = 0; i < items.size(); i++) {

                            HtmlElement partOfSpeech = POS.get(i);
                            HtmlElement etymology = (items.get(i));

                            String header = partOfSpeech.getTextContent();
                            String description = etymology.getTextContent().replaceAll("\\R+", " ");

                            //add to output string
                            output.append(word).append(" ").append("(").append(i).append(")").append("      ").append(header).append(" ").append(description).append("\n");
                        }
                    }
                }

                try {  //write to an output file
                    FileWriter outputWriter = new FileWriter(outputFile);
                    outputWriter.write(output.toString());
                    outputWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {

            }
        }
    }

    public void createList() throws IOException {
        createList(false);
    }
}
