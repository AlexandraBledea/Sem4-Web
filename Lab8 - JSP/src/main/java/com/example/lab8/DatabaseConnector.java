package com.example.lab8;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class DatabaseConnector {
    private Connection connection;
    private int score = 0;
    private final int rows = 3;
    private final int columns = 3;
    private final int[][] puzzle = new int[rows][columns];

    DatabaseConnector() {
        try {
            this.connection = DBConnection.initializeDB();
        } catch (SQLException | ClassNotFoundException ex){
            ex.printStackTrace();
        }
    }

    public void swap(int id1, int id2, int userId){

        //here the ids basically represents the number of the photo (from 0 to 8)

        boolean keepGoing = false;
        boolean invalidId1 = id1 != 8;
        boolean invalidId2 = id2 != 8;
        if(invalidId1 && !invalidId2){
            keepGoing = true;
        }
        else if(!invalidId1 && invalidId2){
            keepGoing = true;
        }

        this.getPuzzle(userId);

        int x_id1 = 0, x_id2 = 0, y_id1 = 0, y_id2 = 0;

        for(int i = 0; i < rows; i++){
            for(int j = 0; j < columns; j++){
                if(this.puzzle[i][j] == id1){
                    x_id1 = i;
                    y_id1 = j;
                }else if(this.puzzle[i][j] == id2){
                    x_id2 = i;
                    y_id2 = j;
                }
            }
        }

        if(x_id1 == x_id2){
            if(Math.abs(y_id1-y_id2) > 1){
                keepGoing = false;
            }
        }
        if(y_id1 == y_id2){
            if(Math.abs(x_id1 - x_id2) > 1){
                keepGoing = false;
            }
        }else if(y_id1 != y_id2 && x_id1 != x_id2){
            keepGoing = false;
        }

        if(keepGoing){
            try{
                PreparedStatement statement = this.connection.prepareStatement("SELECT SUM(Position) FROM puzzle WHERE ID in (?, ?) AND user_id = ?");
                statement.setInt(1, id1);
                statement.setInt(2, id2);
                statement.setInt(3, userId);

                ResultSet rs = statement.executeQuery();
                rs.next();
                int sum = Integer.parseInt(rs.getString(1));

                PreparedStatement statement2 = this.connection.prepareStatement("UPDATE puzzle SET Position = ? - Position WHERE ID IN (?, ?) AND user_id = ?");
                statement2.setInt(1, sum);
                statement2.setInt(2, id1);
                statement2.setInt(3, id2);
                statement2.setInt(4, userId);
                statement2.executeUpdate();

                PreparedStatement statement3 = this.connection.prepareStatement("UPDATE score SET value = score.value + 1 WHERE user_id = ?");
                statement3.setInt(1, userId);
                statement3.execute();

            } catch (SQLException e){
                System.out.println("Error while swapping " + e.getMessage());
            }
        }

    }

    public void resetGame(int userId) {
        List<Integer> randomDistinctPuzzlePiecesArray = shuffleArray();
        try {
            // clear old data and initialize score with 0

            // clear all the puzzle pieces for the user
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM puzzle WHERE user_id = ?");
            preparedStatement.setInt(1, userId);
            preparedStatement.execute();

            //clear the score for the user
            PreparedStatement preparedStatement1 = connection.prepareStatement("DELETE FROM score WHERE user_id = ?");
            preparedStatement1.setInt(1, userId);
            preparedStatement1.execute();

            //add the new score for the user
            PreparedStatement preparedStatement2 = connection.prepareStatement("INSERT INTO score VALUES (0,?)");
            preparedStatement2.setInt(1, userId);
            preparedStatement2.execute();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            // add the puzzle pieces for the user
            for (int i = 0; i < rows * columns; i++) {
                PreparedStatement preparedStatement = this.connection
                        .prepareStatement("INSERT INTO puzzle (ID, Position, user_id) VALUES(?, ?, ?)");
                preparedStatement.setInt(1, i);
                preparedStatement.setInt(2, randomDistinctPuzzlePiecesArray.get(i));
                preparedStatement.setInt(3, userId);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.out.println("SqlException: " + e.toString());
            e.printStackTrace();
        }
    }

    /**
     * make an array of random distinct integers bounded by 0 and rows * columns
     * @return the shuffled list
     */
    private List<Integer> shuffleArray() {
        List<Integer> randomDistinctPuzzlePieces = IntStream.rangeClosed(0, rows  * columns - 1)
                .boxed()
                .collect(Collectors.toList());

        // shuffle the list
        Collections.shuffle(randomDistinctPuzzlePieces);
        return randomDistinctPuzzlePieces;
    }

    public String getPuzzle(int userId) {
        StringBuilder res = new StringBuilder();
        try {
            // we take the score of the user
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM score WHERE user_id = ?");
            preparedStatement.setInt(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()) {
                score = resultSet.getInt("value");
            }else {
                throw new RuntimeException("no rows");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        res.append("<p>Score: ").append(score).append("</p>");
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT  * FROM puzzle where ID >= 0 and ID < ? AND user_id = ?");
            preparedStatement.setInt(1, rows  * columns );
            preparedStatement.setInt(2, userId);
            ResultSet rs = preparedStatement.executeQuery();
            int[] where = new int[rows  * columns ];
            while (rs.next()) {
                // so basically, on each position from the puzzle, we have a corresponding id, which in our case will actually represent the actual number of the photo (from 0 to 8)
                where[rs.getInt("position")] = rs.getInt("id");
            }

            int count  = 0;
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < columns; j++) {
                    this.puzzle[i][j] = where[count];
                    System.out.println("puzzle[" + i + "][" + j + "]=" + where[count]);
                    count ++;
                }
            }
            boolean solved = true;
            for (int i = 0; i < rows  * columns ; ++i) {
                // so here, if on each position, the number of the photo is equal to the position, then it means the puzzle was solved
                if (where[i] != i)
                    solved = false;
                res.append("<img id = '").append(where[i]).append("' class='puzzle_piece' src='utils/").append(where[i]).append(".jpg'/>");
            }
            if (solved) {
                res.append("<p>Congratulations, you finished the puzzle in: ").append(this.score).append("!</p>");
                res.append("<link rel='stylesheet' type='text/css' href='lock.css'>");
            }
        } catch (Exception ex) {
            System.out.println("Error on get Puzzle: " + ex.getMessage());
        }
        return res.toString();
    }


}

