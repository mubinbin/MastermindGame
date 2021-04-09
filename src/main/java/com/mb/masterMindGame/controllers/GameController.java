package com.mb.masterMindGame.controllers;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mb.masterMindGame.services.GameService;

@Controller
public class GameController {
	
	private final GameService gameService;
	
	public GameController(GameService gameService) {
		this.gameService = gameService;
	}

	@RequestMapping("/")
	public String home(Model model) {
		
		String[] difficulties = new String[] {"Easy", "Intermediate", "Hard"};
		model.addAttribute("difficulties", difficulties);
		
		return "home.jsp";
	}
	
	@RequestMapping("/{difficulty}")
	public String game(@PathVariable("difficulty") String difficulty, Model model) throws IOException {
		String[] randNums = null;
		Integer attempts = 10;
		int num = 0;
		
		switch(difficulty){
			case "Easy":
				num =3;
				randNums = gameService.getNumbers(num, 0, 7);
				break;
			case "Intermediate":
				num =4;
				randNums = gameService.getNumbers(num, 0, 7);
				break;
			case "Hard":
				num =5;
				randNums = gameService.getNumbers(num, 0, 7);
				break;
		}
		
		model.addAttribute("randNums", Arrays.toString(randNums));
		model.addAttribute("attempts", attempts);
		model.addAttribute("num", num);
		model.addAttribute("difficulty", difficulty);
		
		return "game.jsp";
	}
	
}
