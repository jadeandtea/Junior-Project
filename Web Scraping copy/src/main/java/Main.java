import java.io.IOException;

public class Main {
    public static void main(String [] args) throws IOException {
        WordListCreater vocabList = new WordListCreater("WordFiles");
        vocabList.createList(true);
        EtymologyEndings etymologyEndings = new EtymologyEndings("WordFiles/sixth-grade-spelling-words.txt");
        etymologyEndings.createList(true);
    }
}
